/**
 * @license
 * Copyright 2020 Google LLC. All Rights Reserved.
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * =============================================================================
 */
import { backend_util, env, FusedConv2D, util } from '@tensorflow/tfjs-core';
import { Conv2DProgram } from '../conv_gpu';
import { Conv2DPackedProgram } from '../conv_packed_gpu';
import { mapActivationToShaderProgram } from '../kernel_utils/kernel_funcs_utils';
import { conv2dByMatMul, conv2dWithIm2Row } from './Conv2D_impl';
import { reshape } from './Reshape';
export function fusedConv2d(args) {
    const { inputs, backend, attrs } = args;
    const { x, filter, bias, preluActivationWeights } = inputs;
    const { strides, pad, dataFormat, dilations, dimRoundingMode, activation, leakyreluAlpha } = attrs;
    const $dataFormat = backend_util.convertConv2DDataFormat(dataFormat);
    const convInfo = backend_util.computeConv2DInfo(x.shape, filter.shape, strides, dilations, pad, dimRoundingMode, false /* depthwise */, $dataFormat);
    let out;
    const intermediates = [];
    const hasBias = bias != null;
    const hasPreluActivationWeights = preluActivationWeights != null;
    const hasLeakyreluAlpha = activation === 'leakyrelu';
    const prepareInputs = () => {
        const inputs = [x, filter];
        // If the input is a 1-D tensor, align it with the channels.
        //
        // For fusedConv2d, the inputs (x, W, bias, preluActivationWeights) are
        // supposed to be aligned with the dataFormat. The 4-D tensor inputs or
        // scalar inputs are originally aligned, but the 1-D tensor inputs are
        // supposed to be aligned with the channels (only bias and PReLU activation
        // weights could be a 1-D tensor).
        const alignInputWithDataFormat = (input, dataFormat) => {
            if (dataFormat === 'NCHW' && input.shape.length === 1 &&
                input.shape[0] !== 1) {
                const alignedInput = reshape({
                    inputs: { x: input },
                    backend,
                    attrs: { shape: [input.shape[0], 1, 1] }
                });
                intermediates.push(alignedInput);
                return alignedInput;
            }
            return input;
        };
        if (hasBias) {
            inputs.push(alignInputWithDataFormat(bias, dataFormat));
        }
        if (hasPreluActivationWeights) {
            inputs.push(alignInputWithDataFormat(preluActivationWeights, dataFormat));
        }
        if (hasLeakyreluAlpha) {
            const $leakyreluAlpha = backend.makeTensorInfo([], 'float32', util.createScalarValue(leakyreluAlpha, 'float32'));
            inputs.push($leakyreluAlpha);
            intermediates.push($leakyreluAlpha);
        }
        return inputs;
    };
    if (convInfo.filterHeight === 1 && convInfo.filterWidth === 1 &&
        convInfo.dilationHeight === 1 && convInfo.dilationWidth === 1 &&
        convInfo.strideHeight === 1 && convInfo.strideWidth === 1 &&
        (convInfo.padInfo.type === 'SAME' || convInfo.padInfo.type === 'VALID')) {
        out = conv2dByMatMul({
            x,
            filter,
            convInfo,
            backend,
            bias,
            activation,
            preluActivationWeights,
            leakyreluAlpha
        });
    }
    else if (convInfo.strideWidth <= 2 && $dataFormat === 'channelsLast'
        && env().getBool('WEBGL_EXP_CONV')) {
        const fusedActivation = activation ? mapActivationToShaderProgram(activation, true) : null;
        const program = new Conv2DPackedProgram(convInfo, hasBias, fusedActivation, hasPreluActivationWeights, hasLeakyreluAlpha);
        const customValues = [
            [convInfo.padInfo.top, convInfo.padInfo.left],
            [convInfo.strideHeight, convInfo.strideWidth],
            [convInfo.dilationHeight, convInfo.dilationWidth],
            [convInfo.inHeight, convInfo.inWidth]
        ];
        const inputs = prepareInputs();
        out = backend.runWebGLProgram(program, inputs, 'float32', customValues);
    }
    else if (env().getBool('WEBGL_CONV_IM2COL')) {
        out = conv2dWithIm2Row({
            x,
            filter,
            convInfo,
            backend,
            bias,
            activation,
            preluActivationWeights,
            leakyreluAlpha
        });
    }
    else {
        const fusedActivation = activation ? mapActivationToShaderProgram(activation, false) : null;
        const program = new Conv2DProgram(convInfo, hasBias, fusedActivation, hasPreluActivationWeights, hasLeakyreluAlpha);
        const inputs = prepareInputs();
        out = backend.runWebGLProgram(program, inputs, 'float32');
    }
    const outReshaped = reshape({ inputs: { x: out }, backend, attrs: { shape: convInfo.outShape } });
    intermediates.push(out);
    intermediates.forEach(t => backend.disposeIntermediateTensorInfo(t));
    return outReshaped;
}
export const fusedConv2DConfig = {
    kernelName: FusedConv2D,
    backendName: 'webgl',
    kernelFunc: fusedConv2d,
};
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiRnVzZWRDb252MkQuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi8uLi8uLi90ZmpzLWJhY2tlbmQtd2ViZ2wvc3JjL2tlcm5lbHMvRnVzZWRDb252MkQudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7Ozs7Ozs7Ozs7Ozs7OztHQWVHO0FBRUgsT0FBTyxFQUFDLFlBQVksRUFBRSxHQUFHLEVBQUUsV0FBVyxFQUE2RSxJQUFJLEVBQUMsTUFBTSx1QkFBdUIsQ0FBQztBQUd0SixPQUFPLEVBQUMsYUFBYSxFQUFDLE1BQU0sYUFBYSxDQUFDO0FBQzFDLE9BQU8sRUFBQyxtQkFBbUIsRUFBQyxNQUFNLG9CQUFvQixDQUFDO0FBQ3ZELE9BQU8sRUFBQyw0QkFBNEIsRUFBQyxNQUFNLG9DQUFvQyxDQUFDO0FBRWhGLE9BQU8sRUFBQyxjQUFjLEVBQUUsZ0JBQWdCLEVBQUMsTUFBTSxlQUFlLENBQUM7QUFDL0QsT0FBTyxFQUFDLE9BQU8sRUFBQyxNQUFNLFdBQVcsQ0FBQztBQUVsQyxNQUFNLFVBQVUsV0FBVyxDQUFDLElBSTNCO0lBQ0MsTUFBTSxFQUFDLE1BQU0sRUFBRSxPQUFPLEVBQUUsS0FBSyxFQUFDLEdBQUcsSUFBSSxDQUFDO0lBQ3RDLE1BQU0sRUFBQyxDQUFDLEVBQUUsTUFBTSxFQUFFLElBQUksRUFBRSxzQkFBc0IsRUFBQyxHQUFHLE1BQU0sQ0FBQztJQUN6RCxNQUFNLEVBQ0osT0FBTyxFQUNQLEdBQUcsRUFDSCxVQUFVLEVBQ1YsU0FBUyxFQUNULGVBQWUsRUFDZixVQUFVLEVBQ1YsY0FBYyxFQUNmLEdBQUcsS0FBSyxDQUFDO0lBRVYsTUFBTSxXQUFXLEdBQUcsWUFBWSxDQUFDLHVCQUF1QixDQUFDLFVBQVUsQ0FBQyxDQUFDO0lBQ3JFLE1BQU0sUUFBUSxHQUFHLFlBQVksQ0FBQyxpQkFBaUIsQ0FDM0MsQ0FBQyxDQUFDLEtBQXlDLEVBQzNDLE1BQU0sQ0FBQyxLQUF5QyxFQUFFLE9BQU8sRUFBRSxTQUFT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QUFDLENBQUMsQ0FBQyxJQUFJLENBQUM7UUFDeEUsTUFBTSxPQUFPLEdBQUcsSUFBSSxhQUFhLENBQzdCLFFBQVEsRUFBRSxPQUFPLEVBQUUsZUFBZSxFQUFFLHlCQUF5QixFQUM3RCxpQkFBaUIsQ0FBQyxDQUFDO1FBRXZCLE1BQU0sTUFBTSxHQUFHLGFBQWEsRUFBRSxDQUFDO1FBQy9CLEdBQUcsR0FBRyxPQUFPLENBQUMsZUFBZSxDQUFDLE9BQU8sRUFBRSxNQUFNLEVBQUUsU0FBUyxDQUFDLENBQUM7S0FDM0Q7SUFFRCxNQUFNLFdBQVcsR0FDYixPQUFPLENBQUMsRUFBQyxNQUFNLEVBQUUsRUFBQyxDQUFDLEVBQUUsR0FBRyxFQUFDLEVBQUUsT0FBTyxFQUFFLEtBQUssRUFBRSxFQUFDLEtBQUssRUFBRSxRQUFRLENBQUMsUUFBUSxFQUFDLEVBQUMsQ0FBQyxDQUFDO0lBRTVFLGFBQWEsQ0FBQyxJQUFJLENBQUMsR0FBRyxDQUFDLENBQUM7SUFDeEIsYUFBYSxDQUFDLE9BQU8sQ0FBQyxDQUFDLENBQUMsRUFBRSxDQUFDLE9BQU8sQ0FBQyw2QkFBNkIsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDO0lBRXJFLE9BQU8sV0FBVyxDQUFDO0FBQ3JCLENBQUM7QUFFRCxNQUFNLENBQUMsTUFBTSxpQkFBaUIsR0FBaUI7SUFDN0MsVUFBVSxFQUFFLFdBQVc7SUFDdkIsV0FBVyxFQUFFLE9BQU87SUFDcEIsVUFBVSxFQUFFLFdBQW9DO0NBQ2pELENBQUMiLCJzb3VyY2VzQ29udGVudCI6WyIvKipcbiAqIEBsaWNlbnNlXG4gKiBDb3B5cmlnaHQgMjAyMCBHb29nbGUgTExDLiBBbGwgUmlnaHRzIFJlc2VydmVkLlxuICogTGljZW5zZWQgdW5kZXIgdGhlIEFwYWNoZSBMaWNlbnNlLCBWZXJzaW9uIDIuMCAodGhlIFwiTGljZW5zZVwiKTtcbiAqIHlvdSBtYXkgbm90IHVzZSB0aGlzIGZpbGUgZXhjZXB0IGluIGNvbXBsaWFuY2Ugd2l0aCB0aGUgTGljZW5zZS5cbiAqIFlvdSBtYXkgb2J0YWluIGEgY29weSBvZiB0aGUgTGljZW5zZSBhdFxuICpcbiAqIGh0dHA6Ly93d3cuYXBhY2hlLm9yZy9saWNlbnNlcy9MSUNFTlNFLTIuMFxuICpcbiAqIFVubGVzcyByZXF1aXJlZCBieSBhcHBsaWNhYmxlIGxhdyBvciBhZ3JlZWQgdG8gaW4gd3JpdGluZywgc29mdHdhcmVcbiAqIGRpc3RyaWJ1dGVkIHVuZGVyIHRoZSBMaWNlbnNlIGlzIGRpc3RyaWJ1dGVkIG9uIGFuIFwiQVMgSVNcIiBCQVNJUyxcbiAqIFdJVEhPVVQgV0FSUkFOVElFUyBPUiBDT05ESVRJT05TIE9GIEFOWSBLSU5ELCBlaXRoZXIgZXhwcmVzcyBvciBpbXBsaWVkLlxuICogU2VlIHRoZSBMaWNlbnNlIGZvciB0aGUgc3BlY2lmaWMgbGFuZ3VhZ2UgZ292ZXJuaW5nIHBlcm1pc3Npb25zIGFuZFxuICogbGltaXRhdGlvbnMgdW5kZXIgdGhlIExpY2Vuc2UuXG4gKiA9PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PVxuICovXG5cbmltcG9ydCB7YmFja2VuZF91dGlsLCBlbnYsIEZ1c2VkQ29udjJELCBGdXNlZENvbnYyREF0dHJzLCBGdXNlZENvbnYyRElucHV0cywgS2VybmVsQ29uZmlnLCBLZXJuZWxGdW5jLCBUZW5zb3JJbmZvLCB1dGlsfSBmcm9tICdAdGVuc29yZmxvdy90ZmpzLWNvcmUnO1xuXG5pbXBvcnQge01hdGhCYWNrZW5kV2ViR0x9IGZyb20gJy4uL2JhY2tlbmRfd2ViZ2wnO1xuaW1wb3J0IHtDb252MkRQcm9ncmFtfSBmcm9tICcuLi9jb252X2dwdSc7XG5pbXBvcnQge0NvbnYyRFBhY2tlZFByb2dyYW19IGZyb20gJy4uL2NvbnZfcGFja2VkX2dwdSc7XG5pbXBvcnQge21hcEFjdGl2YXRpb25Ub1NoYWRlclByb2dyYW19IGZyb20gJy4uL2tlcm5lbF91dGlscy9rZXJuZWxfZnVuY3NfdXRpbHMnO1xuXG5pbXBvcnQge2NvbnYyZEJ5TWF0TXVsLCBjb252MmRXaXRoSW0yUm93fSBmcm9tICcuL0NvbnYyRF9pbXBsJztcbmltcG9ydCB7cmVzaGFwZX0gZnJvbSAnLi9SZXNoYXBlJztcblxuZXhwb3J0IGZ1bmN0aW9uIGZ1c2VkQ29udjJkKGFyZ3M6IHtcbiAgaW5wdXRzOiBGdXNlZENvbnYyRElucHV0cyxcbiAgYXR0cnM6IEZ1c2VkQ29udjJEQXR0cnMsXG4gIGJhY2tlbmQ6IE1hdGhCYWNrZW5kV2ViR0xcbn0pIHtcbiAgY29uc3Qge2lucHV0cywgYmFja2VuZCwgYXR0cnN9ID0gYXJncztcbiAgY29uc3Qge3gsIGZpbHRlciwgYmlhcywgcHJlbHVBY3RpdmF0aW9uV2VpZ2h0c30gPSBpbnB1dHM7XG4gIGNvbnN0IHtcbiAgICBzdHJpZGVzLFxuICAgIHBhZCxcbiAgICBkYXRhRm9ybWF0LFxuICAgIGRpbGF0aW9ucyxcbiAgICBkaW1Sb3VuZGluZ01vZGUsXG4gICAgYWN0aXZhdGlvbixcbiAgICBsZWFreXJlbHVBbHBoYVxuICB9ID0gYXR0cnM7XG5cbiAgY29uc3QgJGRhdGFGb3JtYXQgPSBiYWNrZW5kX3V0aWwuY29udmVydENvbnYyRERhdGFGb3JtYXQoZGF0YUZvcm1hdCk7XG4gIGNvbnN0IGNvbnZJbmZvID0gYmFja2VuZF91dGlsLmNvbXB1dGVDb252MkRJbmZvKFxuICAgICAgeC5zaGFwZSBhcyBbbnVtYmVyLCBudW1iZXIsIG51bWJlciwgbnVtYmVyXSxcbiAgICAgIGZpbHRlci5zaGFwZSBhcyBbbnVtYmVyLCBudW1iZXIsIG51bWJlciwgbnVtYmVyXSwgc3RyaWRlcywgZGlsYXRpb25zLCBwYWQsXG4gICAgICBkaW1Sb3VuZGluZ01vZGUsIGZhbHNlIC8qIGRlcHRod2lzZSAqLywgJGRhdGFGb3JtYXQpO1xuICBsZXQgb3V0OiBUZW5zb3JJbmZvO1xuICBjb25zdCBpbnRlcm1lZGlhdGVzOiBUZW5zb3JJbmZvW10gPSBbXTtcblxuICBjb25zdCBoYXNCaWFzID0gYmlhcyAhPSBudWxsO1xuICBjb25zdCBoYXNQcmVsdUFjdGl2YXRpb25XZWlnaHRzID0gcHJlbHVBY3RpdmF0aW9uV2VpZ2h0cyAhPSBudWxsO1xuICBjb25zdCBoYXNMZWFreXJlbHVBbHBoYSA9IGFjdGl2YXRpb24gPT09ICdsZWFreXJlbHUnO1xuXG4gIGNvbnN0IHByZXBhcmVJbnB1dHMgPSAoKTogVGVuc29ySW5mb1tdID0+IHtcbiAgICBjb25zdCBpbnB1dHM6IFRlbnNvckluZm9bXSA9IFt4LCBmaWx0ZXJdO1xuXG4gICAgLy8gSWYgdGhlIGlucHV0IGlzIGEgMS1EIHRlbnNvciwgYWxpZ24gaXQgd2l0aCB0aGUgY2hhbm5lbHMuXG4gICAgLy9cbiAgICAvLyBGb3IgZnVzZWRDb252MmQsIHRoZSBpbnB1dHMgKHgsIFcsIGJpYXMsIHByZWx1QWN0aXZhdGlvbldlaWdodHMpIGFyZVxuICAgIC8vIHN1cHBvc2VkIHRvIGJlIGFsaWduZWQgd2l0aCB0aGUgZGF0YUZvcm1hdC4gVGhlIDQtRCB0ZW5zb3IgaW5wdXRzIG9yXG4gICAgLy8gc2NhbGFyIGlucHV0cyBhcmUgb3JpZ2luYWxseSBhbGlnbmVkLCBidXQgdGhlIDEtRCB0ZW5zb3IgaW5wdXRzIGFyZVxuICAgIC8vIHN1cHBvc2VkIHRvIGJlIGFsaWduZWQgd2l0aCB0aGUgY2hhbm5lbHMgKG9ubHkgYmlhcyBhbmQgUFJlTFUgYWN0aXZhdGlvblxuICAgIC8vIHdlaWdodHMgY291bGQgYmUgYSAxLUQgdGVuc29yKS5cbiAgICBjb25zdCBhbGlnbklucHV0V2l0aERhdGFGb3JtYXQgPVxuICAgICAgICAoaW5wdXQ6IFRlbnNvckluZm8sIGRhdGFGb3JtYXQ6ICdOSFdDJ3wnTkNIVycpOiBUZW5zb3JJbmZvID0+IHtcbiAgICAgICAgICBpZiAoZGF0YUZvcm1hdCA9PT0gJ05DSFcnICYmIGlucHV0LnNoYXBlLmxlbmd0aCA9PT0gMSAmJlxuICAgICAgICAgICAgICBpbnB1dC5zaGFwZVswXSAhPT0gMSkge1xuICAgICAgICAgICAgY29uc3QgYWxpZ25lZElucHV0ID0gcmVzaGFwZSh7XG4gICAgICAgICAgICAgIGlucHV0czoge3g6IGlucHV0fSxcbiAgICAgICAgICAgICAgYmFja2VuZCxcbiAgICAgICAgICAgICAgYXR0cnM6IHtzaGFwZTogW2lucHV0LnNoYXBlWzBdLCAxLCAxXX1cbiAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgaW50ZXJtZWRpYXRlcy5wdXNoKGFsaWduZWRJbnB1dCk7XG4gICAgICAgICAgICByZXR1cm4gYWxpZ25lZElucHV0O1xuICAgICAgICAgIH1cbiAgICAgICAgICByZXR1cm4gaW5wdXQ7XG4gICAgICAgIH07XG5cbiAgICBpZiAoaGFzQmlhcykge1xuICAgICAgaW5wdXRzLnB1c2goYWxpZ25JbnB1dFdpdGhEYXRhRm9ybWF0KGJpYXMsIGRhdGFGb3JtYXQpKTtcbiAgICB9XG5cbiAgICBpZiAoaGFzUHJlbHVBY3RpdmF0aW9uV2VpZ2h0cykge1xuICAgICAgaW5wdXRzLnB1c2goYWxpZ25JbnB1dFdpdGhEYXRhRm9ybWF0KHByZWx1QWN0aXZhdGlvbldlaWdodHMsIGRhdGFGb3JtYXQpKTtcbiAgICB9XG5cbiAgICBpZiAoaGFzTGVha3lyZWx1QWxwaGEpIHtcbiAgICAgIGNvbnN0ICRsZWFreXJlbHVBbHBoYSA9IGJhY2tlbmQubWFrZVRlbnNvckluZm8oXG4gICAgICAgICAgW10sICdmbG9hdDMyJyxcbiAgICAgICAgICB1dGlsLmNyZWF0ZVNjYWxhclZhbHVlKGxlYWt5cmVsdUFscGhhIGFzIHVua25vd24gYXMgJ2Zsb2F0MzInLCAnZmxvYXQzMicpKTtcbiAgICAgIGlucHV0cy5wdXNoKCRsZWFreXJlbHVBbHBoYSk7XG4gICAgICBpbnRlcm1lZGlhdGVzLnB1c2goJGxlYWt5cmVsdUFscGhhKTtcbiAgICB9XG4gICAgcmV0dXJuIGlucHV0cztcbiAgfTtcblxuICBpZiAoY29udkluZm8uZmlsdGVySGVpZ2h0ID09PSAxICYmIGNvbnZJbmZvLmZpbHRlcldpZHRoID09PSAxICYmXG4gICAgICBjb252SW5mby5kaWxhdGlvbkhlaWdodCA9PT0gMSAmJiBjb252SW5mby5kaWxhdGlvbldpZHRoID09PSAxICYmXG4gICAgICBjb252SW5mby5zdHJpZGVIZWlnaHQgPT09IDEgJiYgY29udkluZm8uc3RyaWRlV2lkdGggPT09IDEgJiZcbiAgICAgIChjb252SW5mby5wYWRJbmZvLnR5cGUgPT09ICdTQU1FJyB8fCBjb252SW5mby5wYWRJbmZvLnR5cGUgPT09ICdWQUxJRCcpKSB7XG4gICAgb3V0ID0gY29udjJkQnlNYXRNdWwoe1xuICAgICAgeCxcbiAgICAgIGZpbHRlcixcbiAgICAgIGNvbnZJbmZvLFxuICAgICAgYmFja2VuZCxcbiAgICAgIGJpYXMsXG4gICAgICBhY3RpdmF0aW9uLFxuICAgICAgcHJlbHVBY3RpdmF0aW9uV2VpZ2h0cyxcbiAgICAgIGxlYWt5cmVsdUFscGhhXG4gICAgfSk7XG4gIH0gZWxzZSBpZiAoY29udkluZm8uc3RyaWRlV2lkdGggPD0gMiAmJiAkZGF0YUZvcm1hdCA9PT0gJ2NoYW5uZWxzTGFzdCdcbiAgICAmJiBlbnYoKS5nZXRCb29sKCdXRUJHTF9FWFBfQ09OVicpXG4gICAgKSB7XG4gICAgICBjb25zdCBmdXNlZEFjdGl2YXRpb24gPVxuICAgICAgICAgIGFjdGl2YXRpb24gPyBtYXBBY3RpdmF0aW9uVG9TaGFkZXJQcm9ncmFtKGFjdGl2YXRpb24sIHRydWUpIDogbnVsbDtcbiAgICBjb25zdCBwcm9ncmFtID0gbmV3IENvbnYyRFBhY2tlZFByb2dyYW0oXG4gICAgICBjb252SW5mbywgaGFzQmlhcywgZnVzZWRBY3RpdmF0aW9uLCBoYXNQcmVsdUFjdGl2YXRpb25XZWlnaHRzLFxuICAgICAgaGFzTGVha3lyZWx1QWxwaGEpO1xuICAgIGNvbnN0IGN1c3RvbVZhbHVlcyA9IFtcbiAgICAgIFtjb252SW5mby5wYWRJbmZvLnRvcCwgY29udkluZm8ucGFkSW5mby5sZWZ0XSxcbiAgICAgIFtjb252SW5mby5zdHJpZGVIZWlnaHQsIGNvbnZJbmZvLnN0cmlkZVdpZHRoXSxcbiAgICAgIFtjb252SW5mby5kaWxhdGlvbkhlaWdodCwgY29udkluZm8uZGlsYXRpb25XaWR0aF0sXG4gICAgICBbY29udkluZm8uaW5IZWlnaHQsIGNvbnZJbmZvLmluV2lkdGhdXG4gICAgXTtcbiAgICBjb25zdCBpbnB1dHMgPSBwcmVwYXJlSW5wdXRzKCk7XG4gICAgb3V0ID0gYmFja2VuZC5ydW5XZWJHTFByb2dyYW0ocHJvZ3JhbSwgaW5wdXRzLCAnZmxvYXQzMicsIGN1c3RvbVZhbHVlcyk7XG4gIH0gZWxzZSBpZiAoZW52KCkuZ2V0Qm9vbCgnV0VCR0xfQ09OVl9JTTJDT0wnKSkge1xuICAgIG91dCA9IGNvbnYyZFdpdGhJbTJSb3coe1xuICAgICAgeCxcbiAgICAgIGZpbHRlcixcbiAgICAgIGNvbnZJbmZvLFxuICAgICAgYmFja2VuZCxcbiAgICAgIGJpYXMsXG4gICAgICBhY3RpdmF0aW9uLFxuICAgICAgcHJlbHVBY3RpdmF0aW9uV2VpZ2h0cyxcbiAgICAgIGxlYWt5cmVsdUFscGhhXG4gICAgfSk7XG4gIH0gZWxzZSB7XG4gICAgY29uc3QgZnVzZWRBY3RpdmF0aW9uID1cbiAgICAgICAgYWN0aXZhdGlvbiA/IG1hcEFjdGl2YXRpb25Ub1NoYWRlclByb2dyYW0oYWN0aXZhdGlvbiwgZmFsc2UpIDogbnVsbDtcbiAgICBjb25zdCBwcm9ncmFtID0gbmV3IENvbnYyRFByb2dyYW0oXG4gICAgICAgIGNvbnZJbmZvLCBoYXNCaWFzLCBmdXNlZEFjdGl2YXRpb24sIGhhc1ByZWx1QWN0aXZhdGlvbldlaWdodHMsXG4gICAgICAgIGhhc0xlYWt5cmVsdUFscGhhKTtcblxuICAgIGNvbnN0IGlucHV0cyA9IHByZXBhcmVJbnB1dHMoKTtcbiAgICBvdXQgPSBiYWNrZW5kLnJ1bldlYkdMUHJvZ3JhbShwcm9ncmFtLCBpbnB1dHMsICdmbG9hdDMyJyk7XG4gIH1cblxuICBjb25zdCBvdXRSZXNoYXBlZCA9XG4gICAgICByZXNoYXBlKHtpbnB1dHM6IHt4OiBvdXR9LCBiYWNrZW5kLCBhdHRyczoge3NoYXBlOiBjb252SW5mby5vdXRTaGFwZX19KTtcblxuICBpbnRlcm1lZGlhdGVzLnB1c2gob3V0KTtcbiAgaW50ZXJtZWRpYXRlcy5mb3JFYWNoKHQgPT4gYmFja2VuZC5kaXNwb3NlSW50ZXJtZWRpYXRlVGVuc29ySW5mbyh0KSk7XG5cbiAgcmV0dXJuIG91dFJlc2hhcGVkO1xufVxuXG5leHBvcnQgY29uc3QgZnVzZWRDb252MkRDb25maWc6IEtlcm5lbENvbmZpZyA9IHtcbiAga2VybmVsTmFtZTogRnVzZWRDb252MkQsXG4gIGJhY2tlbmROYW1lOiAnd2ViZ2wnLFxuICBrZXJuZWxGdW5jOiBmdXNlZENvbnYyZCBhcyB1bmtub3duIGFzIEtlcm5lbEZ1bmMsXG59O1xuIl19