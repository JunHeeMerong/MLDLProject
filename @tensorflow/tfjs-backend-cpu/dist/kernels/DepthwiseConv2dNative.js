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
import { backend_util, DepthwiseConv2dNative, TensorBuffer, util } from '@tensorflow/tfjs-core';
import { assertNotComplex } from '../cpu_util';
export function depthwiseConv2dNative(args) {
    const { inputs, backend, attrs } = args;
    const { x, filter } = inputs;
    const { strides, pad, dilations, dimRoundingMode } = attrs;
    assertNotComplex([x, filter], 'depthwiseConv2DNative');
    const xStrides = util.computeStrides(x.shape);
    const filterStrides = util.computeStrides(filter.shape);
    let $dilations = dilations;
    if ($dilations == null) {
        $dilations = [1, 1];
    }
    util.assert(backend_util.eitherStridesOrDilationsAreOne(strides, $dilations), () => 'Error in depthwiseConv2d: Either strides or dilations must be ' +
        `1. Got strides ${strides} and dilations '${$dilations}'`);
    const convInfo = backend_util.computeConv2DInfo(x.shape, filter.shape, strides, $dilations, pad, dimRoundingMode, true /* depthwise */);
    const { filterHeight, filterWidth, dilationHeight, dilationWidth, padInfo } = convInfo;
    const padLeft = padInfo.left;
    const padTop = padInfo.top;
    const chMul = convInfo.outChannels / convInfo.inChannels;
    const y = new TensorBuffer(convInfo.outShape, x.dtype);
    const xVals = backend.data.get(x.dataId).values;
    const wVals = backend.data.get(filter.dataId).values;
    const yVals = y.values;
    for (let b = 0; b < convInfo.batchSize; ++b) {
        const xOffset1 = b * xStrides[0];
        const yOffset1 = b * y.strides[0];
        for (let yR = 0; yR < convInfo.outHeight; ++yR) {
            const yOffset2 = yOffset1 + yR * y.strides[1];
            const xRCorner = yR * convInfo.strideHeight - padTop;
            for (let wR = 0; wR < filterHeight; ++wR) {
                const xR = xRCorner + wR * dilationHeight;
                if (xR < 0 || xR >= convInfo.inHeight) {
                    continue;
                }
                const wOffset1 = wR * filterStrides[0];
                const xOffset2 = xOffset1 + xR * xStrides[1];
                for (let yC = 0; yC < convInfo.outWidth; ++yC) {
                    const yOffset3 = yOffset2 + yC * y.strides[2];
                    const xCCorner = yC * convInfo.strideWidth - padLeft;
                    for (let wC = 0; wC < filterWidth; ++wC) {
                        const xC = xCCorner + wC * dilationWidth;
                        if (xC < 0 || xC >= convInfo.inWidth) {
                            continue;
                        }
                        const wOffset2 = wOffset1 + wC * filterStrides[1];
                        const xOffset3 = xOffset2 + xC * convInfo.inChannels;
                        let yOffset4 = yOffset3;
                        let wOffset3 = wOffset2;
                        for (let d1 = 0; d1 < convInfo.inChannels; ++d1) {
                            const xVal = xVals[xOffset3 + d1];
                            for (let q = 0; q < chMul; ++q) {
                                yVals[yOffset4 + q] += xVal * wVals[wOffset3 + q];
                            }
                            yOffset4 += chMul;
                            wOffset3 += chMul;
                        }
                    }
                }
            }
        }
    }
    return backend.makeTensorInfo(y.shape, y.dtype, y.values);
}
export const depthwiseConv2dNativeConfig = {
    kernelName: DepthwiseConv2dNative,
    backendName: 'cpu',
    kernelFunc: depthwiseConv2dNative
};
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiRGVwdGh3aXNlQ29udjJkTmF0aXZlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vLi4vLi4vdGZqcy1iYWNrZW5kLWNwdS9zcmMva2VybmVscy9EZXB0aHdpc2VDb252MmROYXRpdmUudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7Ozs7Ozs7Ozs7Ozs7OztHQWVHO0FBRUgsT0FBTyxFQUFDLFlBQVksRUFBRSxxQkFBcUIsRUFBcUYsWUFBWSxFQUEwQixJQUFJLEVBQUMsTUFBTSx1QkFBdUIsQ0FBQztBQUd6TSxPQUFPLEVBQUMsZ0JBQWdCLEVBQUMsTUFBTSxhQUFhLENBQUM7QUFFN0MsTUFBTSxVQUFVLHFCQUFxQixDQUFDLElBSXJDO0lBQ0MsTUFBTSxFQUFDLE1BQU0sRUFBRSxPQUFPLEVBQUUsS0FBSyxFQUFDLEdBQUcsSUFBSSxDQUFDO0lBQ3RDLE1BQU0sRUFBQyxDQUFDLEVBQUUsTUFBTSxFQUFDLEdBQUcsTUFBTSxDQUFDO0lBQzNCLE1BQU0sRUFBQyxPQUFPLEVBQUUsR0FBRyxFQUFFLFNBQVMsRUFBRSxlQUFlLEVBQUMsR0FBRyxLQUFLLENBQUM7SUFFekQsZ0JBQWdCLENBQUMsQ0FBQyxDQUFDLEVBQUUsTUFBTSxDQUFDLEVBQUUsdUJBQXVCLENBQUMsQ0FBQztJQUV2RCxNQUFNLFFBQVEsR0FBRyxJQUFJLENBQUMsY0FBYyxDQUFDLENBQUMsQ0FBQyxLQUFLLENBQUMsQ0FBQztJQUM5QyxNQUFNLGFBQWEsR0FBRyxJQUFJLENBQUMsY0FBYyxDQUFDLE1BQU0sQ0FBQyxLQUFLLENBQUMsQ0FBQztJQUV4RCxJQUFJLFVBQVUsR0FBRyxTQUFTLENBQUM7SUFDM0IsSUFBSSxVQUFVLElBQUksSUFBSSxFQUFFO1FBQ3RCLFVBQVUsR0FBRyxDQUFDLENBQUMsRUFBRSxDQUFDLENBQUMsQ0FBQztLQUNyQjtJQUVELElBQUksQ0FBQyxNQUFNLENBQ1AsWUFBWSxDQUFDLDhCQUE4QixDQUFDLE9BQU8sRUFBRSxV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LFVBQVUsRUFBRSxxQkFBOEM7Q0FDM0QsQ0FBQyIsInNvdXJjZXNDb250ZW50IjpbIi8qKlxuICogQGxpY2Vuc2VcbiAqIENvcHlyaWdodCAyMDIwIEdvb2dsZSBMTEMuIEFsbCBSaWdodHMgUmVzZXJ2ZWQuXG4gKiBMaWNlbnNlZCB1bmRlciB0aGUgQXBhY2hlIExpY2Vuc2UsIFZlcnNpb24gMi4wICh0aGUgXCJMaWNlbnNlXCIpO1xuICogeW91IG1heSBub3QgdXNlIHRoaXMgZmlsZSBleGNlcHQgaW4gY29tcGxpYW5jZSB3aXRoIHRoZSBMaWNlbnNlLlxuICogWW91IG1heSBvYnRhaW4gYSBjb3B5IG9mIHRoZSBMaWNlbnNlIGF0XG4gKlxuICogaHR0cDovL3d3dy5hcGFjaGUub3JnL2xpY2Vuc2VzL0xJQ0VOU0UtMi4wXG4gKlxuICogVW5sZXNzIHJlcXVpcmVkIGJ5IGFwcGxpY2FibGUgbGF3IG9yIGFncmVlZCB0byBpbiB3cml0aW5nLCBzb2Z0d2FyZVxuICogZGlzdHJpYnV0ZWQgdW5kZXIgdGhlIExpY2Vuc2UgaXMgZGlzdHJpYnV0ZWQgb24gYW4gXCJBUyBJU1wiIEJBU0lTLFxuICogV0lUSE9VVCBXQVJSQU5USUVTIE9SIENPTkRJVElPTlMgT0YgQU5ZIEtJTkQsIGVpdGhlciBleHByZXNzIG9yIGltcGxpZWQuXG4gKiBTZWUgdGhlIExpY2Vuc2UgZm9yIHRoZSBzcGVjaWZpYyBsYW5ndWFnZSBnb3Zlcm5pbmcgcGVybWlzc2lvbnMgYW5kXG4gKiBsaW1pdGF0aW9ucyB1bmRlciB0aGUgTGljZW5zZS5cbiAqID09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09XG4gKi9cblxuaW1wb3J0IHtiYWNrZW5kX3V0aWwsIERlcHRod2lzZUNvbnYyZE5hdGl2ZSwgRGVwdGh3aXNlQ29udjJkTmF0aXZlQXR0cnMsIERlcHRod2lzZUNvbnYyZE5hdGl2ZUlucHV0cywgS2VybmVsQ29uZmlnLCBLZXJuZWxGdW5jLCBUZW5zb3JCdWZmZXIsIFRlbnNvckluZm8sIFR5cGVkQXJyYXksIHV0aWx9IGZyb20gJ0B0ZW5zb3JmbG93L3RmanMtY29yZSc7XG5cbmltcG9ydCB7TWF0aEJhY2tlbmRDUFV9IGZyb20gJy4uL2JhY2tlbmRfY3B1JztcbmltcG9ydCB7YXNzZXJ0Tm90Q29tcGxleH0gZnJvbSAnLi4vY3B1X3V0aWwnO1xuXG5leHBvcnQgZnVuY3Rpb24gZGVwdGh3aXNlQ29udjJkTmF0aXZlKGFyZ3M6IHtcbiAgaW5wdXRzOiBEZXB0aHdpc2VDb252MmROYXRpdmVJbnB1dHMsXG4gIGJhY2tlbmQ6IE1hdGhCYWNrZW5kQ1BVLFxuICBhdHRyczogRGVwdGh3aXNlQ29udjJkTmF0aXZlQXR0cnNcbn0pOiBUZW5zb3JJbmZvIHtcbiAgY29uc3Qge2lucHV0cywgYmFja2VuZCwgYXR0cnN9ID0gYXJncztcbiAgY29uc3Qge3gsIGZpbHRlcn0gPSBpbnB1dHM7XG4gIGNvbnN0IHtzdHJpZGVzLCBwYWQsIGRpbGF0aW9ucywgZGltUm91bmRpbmdNb2RlfSA9IGF0dHJzO1xuXG4gIGFzc2VydE5vdENvbXBsZXgoW3gsIGZpbHRlcl0sICdkZXB0aHdpc2VDb252MkROYXRpdmUnKTtcblxuICBjb25zdCB4U3RyaWRlcyA9IHV0aWwuY29tcHV0ZVN0cmlkZXMoeC5zaGFwZSk7XG4gIGNvbnN0IGZpbHRlclN0cmlkZXMgPSB1dGlsLmNvbXB1dGVTdHJpZGVzKGZpbHRlci5zaGFwZSk7XG5cbiAgbGV0ICRkaWxhdGlvbnMgPSBkaWxhdGlvbnM7XG4gIGlmICgkZGlsYXRpb25zID09IG51bGwpIHtcbiAgICAkZGlsYXRpb25zID0gWzEsIDFdO1xuICB9XG5cbiAgdXRpbC5hc3NlcnQoXG4gICAgICBiYWNrZW5kX3V0aWwuZWl0aGVyU3RyaWRlc09yRGlsYXRpb25zQXJlT25lKHN0cmlkZXMsICRkaWxhdGlvbnMpLFxuICAgICAgKCkgPT4gJ0Vycm9yIGluIGRlcHRod2lzZUNvbnYyZDogRWl0aGVyIHN0cmlkZXMgb3IgZGlsYXRpb25zIG11c3QgYmUgJyArXG4gICAgICAgICAgYDEuIEdvdCBzdHJpZGVzICR7c3RyaWRlc30gYW5kIGRpbGF0aW9ucyAnJHskZGlsYXRpb25zfSdgKTtcblxuICBjb25zdCBjb252SW5mbyA9IGJhY2tlbmRfdXRpbC5jb21wdXRlQ29udjJESW5mbyhcbiAgICAgIHguc2hhcGUgYXMgW251bWJlciwgbnVtYmVyLCBudW1iZXIsIG51bWJlcl0sXG4gICAgICBmaWx0ZXIuc2hhcGUgYXMgW251bWJlciwgbnVtYmVyLCBudW1iZXIsIG51bWJlcl0sIHN0cmlkZXMsICRkaWxhdGlvbnMsXG4gICAgICBwYWQsIGRpbVJvdW5kaW5nTW9kZSwgdHJ1ZSAvKiBkZXB0aHdpc2UgKi8pO1xuXG4gIGNvbnN0IHtmaWx0ZXJIZWlnaHQsIGZpbHRlcldpZHRoLCBkaWxhdGlvbkhlaWdodCwgZGlsYXRpb25XaWR0aCwgcGFkSW5mb30gPVxuICAgICAgY29udkluZm87XG4gIGNvbnN0IHBhZExlZnQgPSBwYWRJbmZvLmxlZnQ7XG4gIGNvbnN0IHBhZFRvcCA9IHBhZEluZm8udG9wO1xuICBjb25zdCBjaE11bCA9IGNvbnZJbmZvLm91dENoYW5uZWxzIC8gY29udkluZm8uaW5DaGFubmVscztcbiAgY29uc3QgeSA9IG5ldyBUZW5zb3JCdWZmZXIoY29udkluZm8ub3V0U2hhcGUsIHguZHR5cGUgYXMgJ2Zsb2F0MzInKTtcbiAgY29uc3QgeFZhbHMgPSBiYWNrZW5kLmRhdGEuZ2V0KHguZGF0YUlkKS52YWx1ZXMgYXMgVHlwZWRBcnJheTtcbiAgY29uc3Qgd1ZhbHMgPSBiYWNrZW5kLmRhdGEuZ2V0KGZpbHRlci5kYXRhSWQpLnZhbHVlcyBhcyBUeXBlZEFycmF5O1xuICBjb25zdCB5VmFscyA9IHkudmFsdWVzO1xuXG4gIGZvciAobGV0IGIgPSAwOyBiIDwgY29udkluZm8uYmF0Y2hTaXplOyArK2IpIHtcbiAgICBjb25zdCB4T2Zmc2V0MSA9IGIgKiB4U3RyaWRlc1swXTtcbiAgICBjb25zdCB5T2Zmc2V0MSA9IGIgKiB5LnN0cmlkZXNbMF07XG4gICAgZm9yIChsZXQgeVIgPSAwOyB5UiA8IGNvbnZJbmZvLm91dEhlaWdodDsgKyt5Uikge1xuICAgICAgY29uc3QgeU9mZnNldDIgPSB5T2Zmc2V0MSArIHlSICogeS5zdHJpZGVzWzFdO1xuICAgICAgY29uc3QgeFJDb3JuZXIgPSB5UiAqIGNvbnZJbmZvLnN0cmlkZUhlaWdodCAtIHBhZFRvcDtcbiAgICAgIGZvciAobGV0IHdSID0gMDsgd1IgPCBmaWx0ZXJIZWlnaHQ7ICsrd1IpIHtcbiAgICAgICAgY29uc3QgeFIgPSB4UkNvcm5lciArIHdSICogZGlsYXRpb25IZWlnaHQ7XG4gICAgICAgIGlmICh4UiA8IDAgfHwgeFIgPj0gY29udkluZm8uaW5IZWlnaHQpIHtcbiAgICAgICAgICBjb250aW51ZTtcbiAgICAgICAgfVxuICAgICAgICBjb25zdCB3T2Zmc2V0MSA9IHdSICogZmlsdGVyU3RyaWRlc1swXTtcbiAgICAgICAgY29uc3QgeE9mZnNldDIgPSB4T2Zmc2V0MSArIHhSICogeFN0cmlkZXNbMV07XG4gICAgICAgIGZvciAobGV0IHlDID0gMDsgeUMgPCBjb252SW5mby5vdXRXaWR0aDsgKyt5Qykge1xuICAgICAgICAgIGNvbnN0IHlPZmZzZXQzID0geU9mZnNldDIgKyB5QyAqIHkuc3RyaWRlc1syXTtcbiAgICAgICAgICBjb25zdCB4Q0Nvcm5lciA9IHlDICogY29udkluZm8uc3RyaWRlV2lkdGggLSBwYWRMZWZ0O1xuICAgICAgICAgIGZvciAobGV0IHdDID0gMDsgd0MgPCBmaWx0ZXJXaWR0aDsgKyt3Qykge1xuICAgICAgICAgICAgY29uc3QgeEMgPSB4Q0Nvcm5lciArIHdDICogZGlsYXRpb25XaWR0aDtcbiAgICAgICAgICAgIGlmICh4QyA8IDAgfHwgeEMgPj0gY29udkluZm8uaW5XaWR0aCkge1xuICAgICAgICAgICAgICBjb250aW51ZTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGNvbnN0IHdPZmZzZXQyID0gd09mZnNldDEgKyB3QyAqIGZpbHRlclN0cmlkZXNbMV07XG4gICAgICAgICAgICBjb25zdCB4T2Zmc2V0MyA9IHhPZmZzZXQyICsgeEMgKiBjb252SW5mby5pbkNoYW5uZWxzO1xuICAgICAgICAgICAgbGV0IHlPZmZzZXQ0ID0geU9mZnNldDM7XG4gICAgICAgICAgICBsZXQgd09mZnNldDMgPSB3T2Zmc2V0MjtcbiAgICAgICAgICAgIGZvciAobGV0IGQxID0gMDsgZDEgPCBjb252SW5mby5pbkNoYW5uZWxzOyArK2QxKSB7XG4gICAgICAgICAgICAgIGNvbnN0IHhWYWwgPSB4VmFsc1t4T2Zmc2V0MyArIGQxXTtcbiAgICAgICAgICAgICAgZm9yIChsZXQgcSA9IDA7IHEgPCBjaE11bDsgKytxKSB7XG4gICAgICAgICAgICAgICAgeVZhbHNbeU9mZnNldDQgKyBxXSArPSB4VmFsICogd1ZhbHNbd09mZnNldDMgKyBxXTtcbiAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICB5T2Zmc2V0NCArPSBjaE11bDtcbiAgICAgICAgICAgICAgd09mZnNldDMgKz0gY2hNdWw7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICB9XG4gICAgfVxuICB9XG5cbiAgcmV0dXJuIGJhY2tlbmQubWFrZVRlbnNvckluZm8oeS5zaGFwZSwgeS5kdHlwZSwgeS52YWx1ZXMpO1xufVxuXG5leHBvcnQgY29uc3QgZGVwdGh3aXNlQ29udjJkTmF0aXZlQ29uZmlnOiBLZXJuZWxDb25maWcgPSB7XG4gIGtlcm5lbE5hbWU6IERlcHRod2lzZUNvbnYyZE5hdGl2ZSxcbiAgYmFja2VuZE5hbWU6ICdjcHUnLFxuICBrZXJuZWxGdW5jOiBkZXB0aHdpc2VDb252MmROYXRpdmUgYXMgdW5rbm93biBhcyBLZXJuZWxGdW5jXG59O1xuIl19