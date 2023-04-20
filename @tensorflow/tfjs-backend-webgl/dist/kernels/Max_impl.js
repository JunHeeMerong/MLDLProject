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
import { util } from '@tensorflow/tfjs-core';
import { reduce } from '../kernel_utils/reduce';
import { reshape } from '../kernels/Reshape';
export function maxImpl(x, reduceShape, outShape, backend) {
    const inSize = util.sizeFromShape(reduceShape);
    const xSize = util.sizeFromShape(x.shape);
    const batchSize = xSize / inSize;
    const reshapedInput = reshape({ inputs: { x }, attrs: { shape: [batchSize, inSize] }, backend });
    const reduced = reduce(reshapedInput, x.dtype, 'max', backend);
    const reshapedOutput = reshape({ inputs: { x: reduced }, attrs: { shape: outShape }, backend });
    backend.disposeIntermediateTensorInfo(reshapedInput);
    backend.disposeIntermediateTensorInfo(reduced);
    return reshapedOutput;
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiTWF4X2ltcGwuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi8uLi8uLi90ZmpzLWJhY2tlbmQtd2ViZ2wvc3JjL2tlcm5lbHMvTWF4X2ltcGwudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7Ozs7Ozs7Ozs7Ozs7OztHQWVHO0FBRUgsT0FBTyxFQUFhLElBQUksRUFBQyxNQUFNLHVCQUF1QixDQUFDO0FBR3ZELE9BQU8sRUFBQyxNQUFNLEVBQUMsTUFBTSx3QkFBd0IsQ0FBQztBQUM5QyxPQUFPLEVBQUMsT0FBTyxFQUFDLE1BQU0sb0JBQW9CLENBQUM7QUFFM0MsTUFBTSxVQUFVLE9BQU8sQ0FDbkIsQ0FBYSxFQUFFLFdBQXFCLEVBQUUsUUFBa0IsRUFDeEQsT0FBeUI7SUFDM0IsTUFBTSxNQUFNLEdBQUcsSUFBSSxDQUFDLGFBQWEsQ0FBQyxXQUFXLENBQUMsQ0FBQztJQUMvQyxNQUFNLEtBQUssR0FBRyxJQUFJLENBQUMsYUFBYSxDQUFDLENBQUMsQ0FBQyxLQUFLLENBQUMsQ0FBQztJQUMxQyxNQUFNLFNBQVMsR0FBRyxLQUFLLEdBQUcsTUFBTSxDQUFDO0lBQ2pDLE1BQU0sYUFBYSxHQUNmLE9BQU8sQ0FBQyxFQUFDLE1BQU0sRUFBRSxFQUFDLENBQUMsRUFBQyxFQUFFLEtBQUssRUFBRSxFQUFDLEtBQUssRUFBRSxDQUFDLFNBQVMsRUFBRSxNQUFNLENBQUMsRUFBQyxFQUFFLE9BQU8sRUFBQyxDQUFDLENBQUM7SUFFekUsTUFBTSxPQUFPLEdBQUcsTUFBTSxDQUFDLGFBQWEsRUFBRSxDQUFDLENBQUMsS0FBSyxFQUFFLEtBQUssRUFBRSxPQUFPLENBQUMsQ0FBQztJQUMvRCxNQUFNLGNBQWMsR0FDaEIsT0FBTyxDQUFDLEVBQUMsTUFBTSxFQUFFLEVBQUMsQ0FBQyxFQUFFLE9BQU8sRUFBQyxFQUFFLEtBQUssRUFBRSxFQUFDLEtBQUssRUFBRSxRQUFRLEVBQUMsRUFBRSxPQUFPLEVBQUMsQ0FBQyxDQUFDO0lBRXZFLE9BQU8sQ0FBQyw2QkFBNkIsQ0FBQyxhQUFhLENBQUMsQ0FBQztJQUNyRCxPQUFPLENBQUMsNkJBQTZCLENBQUMsT0FBTyxDQUFDLENBQUM7SUFFL0MsT0FBTyxjQUFjLENBQUM7QUFDeEIsQ0FBQyIsInNvdXJjZXNDb250ZW50IjpbIi8qKlxuICogQGxpY2Vuc2VcbiAqIENvcHlyaWdodCAyMDIwIEdvb2dsZSBMTEMuIEFsbCBSaWdodHMgUmVzZXJ2ZWQuXG4gKiBMaWNlbnNlZCB1bmRlciB0aGUgQXBhY2hlIExpY2Vuc2UsIFZlcnNpb24gMi4wICh0aGUgXCJMaWNlbnNlXCIpO1xuICogeW91IG1heSBub3QgdXNlIHRoaXMgZmlsZSBleGNlcHQgaW4gY29tcGxpYW5jZSB3aXRoIHRoZSBMaWNlbnNlLlxuICogWW91IG1heSBvYnRhaW4gYSBjb3B5IG9mIHRoZSBMaWNlbnNlIGF0XG4gKlxuICogaHR0cDovL3d3dy5hcGFjaGUub3JnL2xpY2Vuc2VzL0xJQ0VOU0UtMi4wXG4gKlxuICogVW5sZXNzIHJlcXVpcmVkIGJ5IGFwcGxpY2FibGUgbGF3IG9yIGFncmVlZCB0byBpbiB3cml0aW5nLCBzb2Z0d2FyZVxuICogZGlzdHJpYnV0ZWQgdW5kZXIgdGhlIExpY2Vuc2UgaXMgZGlzdHJpYnV0ZWQgb24gYW4gXCJBUyBJU1wiIEJBU0lTLFxuICogV0lUSE9VVCBXQVJSQU5USUVTIE9SIENPTkRJVElPTlMgT0YgQU5ZIEtJTkQsIGVpdGhlciBleHByZXNzIG9yIGltcGxpZWQuXG4gKiBTZWUgdGhlIExpY2Vuc2UgZm9yIHRoZSBzcGVjaWZpYyBsYW5ndWFnZSBnb3Zlcm5pbmcgcGVybWlzc2lvbnMgYW5kXG4gKiBsaW1pdGF0aW9ucyB1bmRlciB0aGUgTGljZW5zZS5cbiAqID09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09XG4gKi9cblxuaW1wb3J0IHtUZW5zb3JJbmZvLCB1dGlsfSBmcm9tICdAdGVuc29yZmxvdy90ZmpzLWNvcmUnO1xuXG5pbXBvcnQge01hdGhCYWNrZW5kV2ViR0x9IGZyb20gJy4uL2JhY2tlbmRfd2ViZ2wnO1xuaW1wb3J0IHtyZWR1Y2V9IGZyb20gJy4uL2tlcm5lbF91dGlscy9yZWR1Y2UnO1xuaW1wb3J0IHtyZXNoYXBlfSBmcm9tICcuLi9rZXJuZWxzL1Jlc2hhcGUnO1xuXG5leHBvcnQgZnVuY3Rpb24gbWF4SW1wbChcbiAgICB4OiBUZW5zb3JJbmZvLCByZWR1Y2VTaGFwZTogbnVtYmVyW10sIG91dFNoYXBlOiBudW1iZXJbXSxcbiAgICBiYWNrZW5kOiBNYXRoQmFja2VuZFdlYkdMKTogVGVuc29ySW5mbyB7XG4gIGNvbnN0IGluU2l6ZSA9IHV0aWwuc2l6ZUZyb21TaGFwZShyZWR1Y2VTaGFwZSk7XG4gIGNvbnN0IHhTaXplID0gdXRpbC5zaXplRnJvbVNoYXBlKHguc2hhcGUpO1xuICBjb25zdCBiYXRjaFNpemUgPSB4U2l6ZSAvIGluU2l6ZTtcbiAgY29uc3QgcmVzaGFwZWRJbnB1dCA9XG4gICAgICByZXNoYXBlKHtpbnB1dHM6IHt4fSwgYXR0cnM6IHtzaGFwZTogW2JhdGNoU2l6ZSwgaW5TaXplXX0sIGJhY2tlbmR9KTtcblxuICBjb25zdCByZWR1Y2VkID0gcmVkdWNlKHJlc2hhcGVkSW5wdXQsIHguZHR5cGUsICdtYXgnLCBiYWNrZW5kKTtcbiAgY29uc3QgcmVzaGFwZWRPdXRwdXQgPVxuICAgICAgcmVzaGFwZSh7aW5wdXRzOiB7eDogcmVkdWNlZH0sIGF0dHJzOiB7c2hhcGU6IG91dFNoYXBlfSwgYmFja2VuZH0pO1xuXG4gIGJhY2tlbmQuZGlzcG9zZUludGVybWVkaWF0ZVRlbnNvckluZm8ocmVzaGFwZWRJbnB1dCk7XG4gIGJhY2tlbmQuZGlzcG9zZUludGVybWVkaWF0ZVRlbnNvckluZm8ocmVkdWNlZCk7XG5cbiAgcmV0dXJuIHJlc2hhcGVkT3V0cHV0O1xufVxuIl19