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
import { env, FusedBatchNorm, util } from '@tensorflow/tfjs-core';
import { BatchNormProgram } from '../batchnorm_gpu';
import { BatchNormPackedProgram } from '../batchnorm_packed_gpu';
export const batchNorm = ({ inputs, backend, attrs }) => {
    const { x, mean, variance, offset, scale } = inputs;
    util.assert(mean.shape.length === variance.shape.length, () => 'Batch normalization gradient requires mean and variance to have ' +
        'equal ranks.');
    util.assert(offset == null || mean.shape.length === offset.shape.length, () => 'Batch normalization gradient requires mean and offset to have ' +
        'equal ranks.');
    util.assert(scale == null || mean.shape.length === scale.shape.length, () => 'Batch normalization gradient requires mean and scale to have ' +
        'equal ranks.');
    let { varianceEpsilon } = attrs;
    if (varianceEpsilon == null) {
        varianceEpsilon = 0.001;
    }
    const finalInputs = [x, mean, variance];
    let offsetShape = null;
    if (offset != null) {
        offsetShape = offset.shape;
        finalInputs.push(offset);
    }
    let scaleShape = null;
    if (scale != null) {
        scaleShape = scale.shape;
        finalInputs.push(scale);
    }
    const program = env().getBool('WEBGL_PACK_NORMALIZATION') ?
        new BatchNormPackedProgram(x.shape, mean.shape, variance.shape, offsetShape, scaleShape, varianceEpsilon) :
        new BatchNormProgram(x.shape, mean.shape, variance.shape, offsetShape, scaleShape, varianceEpsilon);
    const output = backend.runWebGLProgram(program, finalInputs, finalInputs[0].dtype);
    return output;
};
export const batchNormConfig = {
    kernelName: FusedBatchNorm,
    backendName: 'webgl',
    kernelFunc: batchNorm,
};
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiQmF0Y2hOb3JtLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vLi4vLi4vdGZqcy1iYWNrZW5kLXdlYmdsL3NyYy9rZXJuZWxzL0JhdGNoTm9ybS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFDQTs7Ozs7Ozs7Ozs7Ozs7O0dBZUc7QUFFSCxPQUFPLEVBQUMsR0FBRyxFQUFFLGNBQWMsRUFBbUYsSUFBSSxFQUFDLE1BQU0sdUJBQXVCLENBQUM7QUFHakosT0FBTyxFQUFDLGdCQUFnQixFQUFDLE1BQU0sa0JBQWtCLENBQUM7QUFDbEQsT0FBTyxFQUFDLHNCQUFzQixFQUFDLE1BQU0seUJBQXlCLENBQUM7QUFFL0QsTUFBTSxDQUFDLE1BQU0sU0FBUyxHQUlILENBQUMsRUFBQyxNQUFNLEVBQUUsT0FBTyxFQUFFLEtBQUssRUFBQyxFQUFFLEVBQUU7SUFDOUMsTUFBTSxFQUFDLENBQUMsRUFBRSxJQUFJLEVBQUUsUUFBUSxFQUFFLE1BQU0sRUFBRSxLQUFLLEVBQUMsR0FBRyxNQUFNLENBQUM7SUFFbEQsSUFBSSxDQUFDLE1BQU0sQ0FDUCxJQUFJLENBQUMsS0FBSyxDQUFDLE1BQU0sS0FBSyxRQUFRLENBQUMsS0FBSyxDQUFDLE1BQU0sRUFDM0MsR0FBRyxFQUFFLENBQUMsa0VBQWtFO1FBQ3BFLGNBQWMsQ0FBQyxDQUFDO0lBQ3hCLElBQUksQ0FBQyxNQUFNLENBQ1AsTUFBTSxJQUFJLElBQUksSUFBSSxJQUFJLENBQUMsS0FBSyxDQUFDLE1BQU0sS0FBSyxNQUFNLENBQUMsS0FBSyxDQUFDLE1BQU0sRUFDM0QsR0FBRyxFQUFFLENBQUMsZ0VBQWdFO1FBQ2xFLGNBQWMsQ0FBQyxDQUFDO0lBQ3hCLElBQUksQ0FBQyxNQUFNLENBQ1AsS0FBSyxJQUFJLElBQUksSUFBSSxJQUFJLENBQUMsS0FBSyxDQUFDLE1BQU0sS0FBSyxLQUFLLENBQUMsS0FBSyxDQUFDLE1BQU0sRUFDekQsR0FBRyxFQUFFLENBQUMsK0RBQStEO1FBQ2pFLGNBQWMsQ0FBQyxDQUFDO0lBRXhCLElBQUksRUFBQyxlQUFlLEVBQUMsR0FBRyxLQUFLLENBQUM7SUFDOUIsSUFBSSxlQUFlLElBQUksSUFBSSxFQUFFO1FBQzNCLGVBQWUsR0FBRyxLQUFLLENBQUM7S0FDekI7SUFFRCxNQUFNLFdBQVcsR0FBRyxDQUFDLENBQUMsRUFBRSxJQUFJLEVBQUUsUUFBUSxDQUFDLENBQUM7SUFFeEMsSUFBSSxXQUFXLEdBQUcsSUFBSSxDQUFDO0lBQ3ZCLElBQUksTUFBTSxJQUFJLElBQUksRUFBRTtRQUNsQixXQUFXLEdBQUcsTUFBTSxDQUFDLEtBQUssQ0FBQztRQUMzQixXQUFXLENBQUMsSUFBSSxDQUFDLE1BQU0sQ0FBQyxDQUFDO0tBQzFCO0lBRUQsSUFBSSxVQUFVLEdBQUcsSUFBSSxDQUFDO0lBQ3RCLElBQUksS0FBSyxJQUFJLElBQUksRUFBRTtRQUNqQixVQUFVLEdBQUcsS0FBSyxDQUFDLEtBQUssQ0FBQztRQUN6QixXQUFXLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxDQUFDO0tBQ3pCO0lBRUQsTUFBTSxPQUFPLEdBQUcsR0FBRyxFQUFFLENBQUMsT0FBTyxDQUFDLDBCQUEwQixDQUFDLENBQUMsQ0FBQztRQUN2RCxJQUFJLHNCQUFzQixDQUN0QixDQUFDLENBQUMsS0FBSyxFQUFFLElBQUksQ0FBQyxLQUFLLEVBQUUsUUFBUSxDQUFDLEtBQUssRUFBRSxXQUFXLEVBQUUsVUFBVSxFQUM1RCxlQUFlLENBQUMsQ0FBQyxDQUFDO1FBQ3RCLElBQUksZ0JBQWdCLENBQ2hCLENBQUMsQ0FBQyxLQUFLLEVBQUUsSUFBSSxDQUFDLEtBQUssRUFBRSxRQUFRLENBQUMsS0FBSyxFQUFFLFdBQVcsRUFBRSxVQUFVLEVBQzVELGVBQWUsQ0FBQyxDQUFDO0lBQ3pCLE1BQU0sTUFBTSxHQUNSLE9BQU8sQ0FBQyxlQUFlLENBQUMsT0FBTyxFQUFFLFdBQVcsRUFBRSxXQUFXLENBQUMsQ0FBQyxDQUFDLENBQUMsS0FBSyxDQUFDLENBQUM7SUFFeEUsT0FBTyxNQUFNLENBQUM7QUFDaEIsQ0FBQyxDQUFDO0FBRUYsTUFBTSxDQUFDLE1BQU0sZUFBZSxHQUFpQjtJQUMzQyxVQUFVLEVBQUUsY0FBYztJQUMxQixXQUFXLEVBQUUsT0FBTztJQUNwQixVQUFVLEVBQUUsU0FBa0M7Q0FDL0MsQ0FBQyIsInNvdXJjZXNDb250ZW50IjpbIlxuLyoqXG4gKiBAbGljZW5zZVxuICogQ29weXJpZ2h0IDIwMjAgR29vZ2xlIExMQy4gQWxsIFJpZ2h0cyBSZXNlcnZlZC5cbiAqIExpY2Vuc2VkIHVuZGVyIHRoZSBBcGFjaGUgTGljZW5zZSwgVmVyc2lvbiAyLjAgKHRoZSBcIkxpY2Vuc2VcIik7XG4gKiB5b3UgbWF5IG5vdCB1c2UgdGhpcyBmaWxlIGV4Y2VwdCBpbiBjb21wbGlhbmNlIHdpdGggdGhlIExpY2Vuc2UuXG4gKiBZb3UgbWF5IG9idGFpbiBhIGNvcHkgb2YgdGhlIExpY2Vuc2UgYXRcbiAqXG4gKiBodHRwOi8vd3d3LmFwYWNoZS5vcmcvbGljZW5zZXMvTElDRU5TRS0yLjBcbiAqXG4gKiBVbmxlc3MgcmVxdWlyZWQgYnkgYXBwbGljYWJsZSBsYXcgb3IgYWdyZWVkIHRvIGluIHdyaXRpbmcsIHNvZnR3YXJlXG4gKiBkaXN0cmlidXRlZCB1bmRlciB0aGUgTGljZW5zZSBpcyBkaXN0cmlidXRlZCBvbiBhbiBcIkFTIElTXCIgQkFTSVMsXG4gKiBXSVRIT1VUIFdBUlJBTlRJRVMgT1IgQ09ORElUSU9OUyBPRiBBTlkgS0lORCwgZWl0aGVyIGV4cHJlc3Mgb3IgaW1wbGllZC5cbiAqIFNlZSB0aGUgTGljZW5zZSBmb3IgdGhlIHNwZWNpZmljIGxhbmd1YWdlIGdvdmVybmluZyBwZXJtaXNzaW9ucyBhbmRcbiAqIGxpbWl0YXRpb25zIHVuZGVyIHRoZSBMaWNlbnNlLlxuICogPT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT1cbiAqL1xuXG5pbXBvcnQge2VudiwgRnVzZWRCYXRjaE5vcm0sIEZ1c2VkQmF0Y2hOb3JtQXR0cnMsIEZ1c2VkQmF0Y2hOb3JtSW5wdXRzLCBLZXJuZWxDb25maWcsIEtlcm5lbEZ1bmMsIFRlbnNvckluZm8sIHV0aWx9IGZyb20gJ0B0ZW5zb3JmbG93L3RmanMtY29yZSc7XG5cbmltcG9ydCB7TWF0aEJhY2tlbmRXZWJHTH0gZnJvbSAnLi4vYmFja2VuZF93ZWJnbCc7XG5pbXBvcnQge0JhdGNoTm9ybVByb2dyYW19IGZyb20gJy4uL2JhdGNobm9ybV9ncHUnO1xuaW1wb3J0IHtCYXRjaE5vcm1QYWNrZWRQcm9ncmFtfSBmcm9tICcuLi9iYXRjaG5vcm1fcGFja2VkX2dwdSc7XG5cbmV4cG9ydCBjb25zdCBiYXRjaE5vcm06IChwYXJhbXM6IHtcbiAgaW5wdXRzOiBGdXNlZEJhdGNoTm9ybUlucHV0cyxcbiAgYmFja2VuZDogTWF0aEJhY2tlbmRXZWJHTCxcbiAgYXR0cnM6IEZ1c2VkQmF0Y2hOb3JtQXR0cnNcbn0pID0+IFRlbnNvckluZm8gPSAoe2lucHV0cywgYmFja2VuZCwgYXR0cnN9KSA9PiB7XG4gIGNvbnN0IHt4LCBtZWFuLCB2YXJpYW5jZSwgb2Zmc2V0LCBzY2FsZX0gPSBpbnB1dHM7XG5cbiAgdXRpbC5hc3NlcnQoXG4gICAgICBtZWFuLnNoYXBlLmxlbmd0aCA9PT0gdmFyaWFuY2Uuc2hhcGUubGVuZ3RoLFxuICAgICAgKCkgPT4gJ0JhdGNoIG5vcm1hbGl6YXRpb24gZ3JhZGllbnQgcmVxdWlyZXMgbWVhbiBhbmQgdmFyaWFuY2UgdG8gaGF2ZSAnICtcbiAgICAgICAgICAnZXF1YWwgcmFua3MuJyk7XG4gIHV0aWwuYXNzZXJ0KFxuICAgICAgb2Zmc2V0ID09IG51bGwgfHwgbWVhbi5zaGFwZS5sZW5ndGggPT09IG9mZnNldC5zaGFwZS5sZW5ndGgsXG4gICAgICAoKSA9PiAnQmF0Y2ggbm9ybWFsaXphdGlvbiBncmFkaWVudCByZXF1aXJlcyBtZWFuIGFuZCBvZmZzZXQgdG8gaGF2ZSAnICtcbiAgICAgICAgICAnZXF1YWwgcmFua3MuJyk7XG4gIHV0aWwuYXNzZXJ0KFxuICAgICAgc2NhbGUgPT0gbnVsbCB8fCBtZWFuLnNoYXBlLmxlbmd0aCA9PT0gc2NhbGUuc2hhcGUubGVuZ3RoLFxuICAgICAgKCkgPT4gJ0JhdGNoIG5vcm1hbGl6YXRpb24gZ3JhZGllbnQgcmVxdWlyZXMgbWVhbiBhbmQgc2NhbGUgdG8gaGF2ZSAnICtcbiAgICAgICAgICAnZXF1YWwgcmFua3MuJyk7XG5cbiAgbGV0IHt2YXJpYW5jZUVwc2lsb259ID0gYXR0cnM7XG4gIGlmICh2YXJpYW5jZUVwc2lsb24gPT0gbnVsbCkge1xuICAgIHZhcmlhbmNlRXBzaWxvbiA9IDAuMDAxO1xuICB9XG5cbiAgY29uc3QgZmluYWxJbnB1dHMgPSBbeCwgbWVhbiwgdmFyaWFuY2VdO1xuXG4gIGxldCBvZmZzZXRTaGFwZSA9IG51bGw7XG4gIGlmIChvZmZzZXQgIT0gbnVsbCkge1xuICAgIG9mZnNldFNoYXBlID0gb2Zmc2V0LnNoYXBlO1xuICAgIGZpbmFsSW5wdXRzLnB1c2gob2Zmc2V0KTtcbiAgfVxuXG4gIGxldCBzY2FsZVNoYXBlID0gbnVsbDtcbiAgaWYgKHNjYWxlICE9IG51bGwpIHtcbiAgICBzY2FsZVNoYXBlID0gc2NhbGUuc2hhcGU7XG4gICAgZmluYWxJbnB1dHMucHVzaChzY2FsZSk7XG4gIH1cblxuICBjb25zdCBwcm9ncmFtID0gZW52KCkuZ2V0Qm9vbCgnV0VCR0xfUEFDS19OT1JNQUxJWkFUSU9OJykgP1xuICAgICAgbmV3IEJhdGNoTm9ybVBhY2tlZFByb2dyYW0oXG4gICAgICAgICAgeC5zaGFwZSwgbWVhbi5zaGFwZSwgdmFyaWFuY2Uuc2hhcGUsIG9mZnNldFNoYXBlLCBzY2FsZVNoYXBlLFxuICAgICAgICAgIHZhcmlhbmNlRXBzaWxvbikgOlxuICAgICAgbmV3IEJhdGNoTm9ybVByb2dyYW0oXG4gICAgICAgICAgeC5zaGFwZSwgbWVhbi5zaGFwZSwgdmFyaWFuY2Uuc2hhcGUsIG9mZnNldFNoYXBlLCBzY2FsZVNoYXBlLFxuICAgICAgICAgIHZhcmlhbmNlRXBzaWxvbik7XG4gIGNvbnN0IG91dHB1dCA9XG4gICAgICBiYWNrZW5kLnJ1bldlYkdMUHJvZ3JhbShwcm9ncmFtLCBmaW5hbElucHV0cywgZmluYWxJbnB1dHNbMF0uZHR5cGUpO1xuXG4gIHJldHVybiBvdXRwdXQ7XG59O1xuXG5leHBvcnQgY29uc3QgYmF0Y2hOb3JtQ29uZmlnOiBLZXJuZWxDb25maWcgPSB7XG4gIGtlcm5lbE5hbWU6IEZ1c2VkQmF0Y2hOb3JtLFxuICBiYWNrZW5kTmFtZTogJ3dlYmdsJyxcbiAga2VybmVsRnVuYzogYmF0Y2hOb3JtIGFzIHVua25vd24gYXMgS2VybmVsRnVuYyxcbn07XG4iXX0=