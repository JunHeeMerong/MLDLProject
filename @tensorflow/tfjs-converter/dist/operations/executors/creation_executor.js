/**
 * @license
 * Copyright 2018 Google LLC. All Rights Reserved.
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
// tslint:disable-next-line: no-imports-from-dist
import * as tfOps from '@tensorflow/tfjs-core/dist/ops/ops_for_converter';
import { getParamValue } from './utils';
export const executeOp = (node, tensorMap, context, ops = tfOps) => {
    switch (node.op) {
        case 'Fill': {
            const shape = getParamValue('shape', node, tensorMap, context);
            const dtype = getParamValue('dtype', node, tensorMap, context);
            const value = getParamValue('value', node, tensorMap, context);
            return [ops.fill(shape, value, dtype)];
        }
        case 'LinSpace': {
            const start = getParamValue('start', node, tensorMap, context);
            const stop = getParamValue('stop', node, tensorMap, context);
            const num = getParamValue('num', node, tensorMap, context);
            return [ops.linspace(start, stop, num)];
        }
        case 'Multinomial': {
            const logits = getParamValue('logits', node, tensorMap, context);
            const numSamples = getParamValue('numSamples', node, tensorMap, context);
            const seed = getParamValue('seed', node, tensorMap, context);
            return [ops.multinomial(logits, numSamples, seed)];
        }
        case 'OneHot': {
            const indices = getParamValue('indices', node, tensorMap, context);
            const depth = getParamValue('depth', node, tensorMap, context);
            const onValue = getParamValue('onValue', node, tensorMap, context);
            const offValue = getParamValue('offValue', node, tensorMap, context);
            const dtype = getParamValue('dtype', node, tensorMap, context);
            return [ops.oneHot(indices, depth, onValue, offValue, dtype)];
        }
        case 'Ones': {
            return [ops.ones(getParamValue('shape', node, tensorMap, context), getParamValue('dtype', node, tensorMap, context))];
        }
        case 'OnesLike': {
            return [ops.onesLike(getParamValue('x', node, tensorMap, context))];
        }
        case 'RandomStandardNormal': {
            return [ops.randomStandardNormal(getParamValue('shape', node, tensorMap, context), getParamValue('dtype', node, tensorMap, context), getParamValue('seed', node, tensorMap, context))];
        }
        case 'RandomUniform': {
            return [ops.randomUniform(
                // tslint:disable-next-line:no-any
                getParamValue('shape', node, tensorMap, context), getParamValue('minval', node, tensorMap, context), getParamValue('maxval', node, tensorMap, context), getParamValue('dtype', node, tensorMap, context))];
        }
        case 'Range': {
            const start = getParamValue('start', node, tensorMap, context);
            const stop = getParamValue('stop', node, tensorMap, context);
            const step = getParamValue('step', node, tensorMap, context);
            return [ops.range(start, stop, step, getParamValue('dtype', node, tensorMap, context))];
        }
        case 'TruncatedNormal': {
            const shape = getParamValue('shape', node, tensorMap, context);
            const mean = getParamValue('mean', node, tensorMap, context);
            const stdDev = getParamValue('stdDev', node, tensorMap, context);
            const seed = getParamValue('seed', node, tensorMap, context);
            return [ops.truncatedNormal(shape, mean, stdDev, getParamValue('dtype', node, tensorMap, context), seed)];
        }
        case 'Zeros': {
            return [ops.zeros(getParamValue('shape', node, tensorMap, context), getParamValue('dtype', node, tensorMap, context))];
        }
        case 'ZerosLike': {
            return [ops.zerosLike(getParamValue('x', node, tensorMap, context))];
        }
        default:
            throw TypeError(`Node type ${node.op} is not implemented`);
    }
};
export const CATEGORY = 'creation';
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY3JlYXRpb25fZXhlY3V0b3IuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi8uLi8uLi8uLi90ZmpzLWNvbnZlcnRlci9zcmMvb3BlcmF0aW9ucy9leGVjdXRvcnMvY3JlYXRpb25fZXhlY3V0b3IudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7Ozs7Ozs7Ozs7Ozs7OztHQWVHO0FBR0gsaURBQWlEO0FBQ2pELE9BQU8sS0FBSyxLQUFLLE1BQU0sa0RBQWtELENBQUM7QUFNMUUsT0FBTyxFQUFDLGFBQWEsRUFBQyxNQUFNLFNBQVMsQ0FBQztBQUV0QyxNQUFNLENBQUMsTUFBTSxTQUFTLEdBQ2xCLENBQUMsSUFBVSxFQUFFLFNBQTBCLEVBQUUsT0FBeUIsRUFDakUsR0FBRyxHQUFHLEtBQUssRUFBWSxFQUFFO0lBQ3hCLFFBQVEsSUFBSSxDQUFDLEVBQUUsRUFBRTtRQUNmLEtBQUssTUFBTSxDQUFDLENBQUM7WUFDWCxNQUFNLEtBQUssR0FDUCxhQUFhLENBQUMsT0FBTyxFQUFFLElBQUksRUFBRSxTQUFTLEVBQUUsT0FBTyxDQUFhLENBQUM7WUFDakUsTUFBTSxLQUFLLEdBQ1AsYUFBYSxDQUFDLE9BQU8sRUFBRSxJQUFJLEVBQUUsU0FBUyxFQUFFLE9BQU8sQ0FBYSxDQUFDO1lBQ2pFLE1BQU0sS0FBSyxHQUNQLGFBQWEsQ0FBQyxPQUFPLEVBQUUsSUFBSSxFQUFFLFNBQVMsRUFBRSxPQUFPLENBQVcsQ0FBQztZQUMvRCxPQUFPLENBQUMsR0FBRyxDQUFDLElBQUksQ0FBQyxLQUFLLEVBQUUsS0FBSyxFQUFFLEtBQUssQ0FBQyxDQUFDLENBQUM7U0FDeEM7UUFDRCxLQUFLLFVBQVUsQ0FBQyxDQUFDO1lBQ2YsTUFBTSxLQUFLLEdBQ1AsYUFBYSxDQUFDLE9BQU8sRUFBRSxJQUFJLEVBQUUsU0FBUyxFQUFFLE9BQU8sQ0FBVyxDQUFDO1lBQy9ELE1BQU0sSUFBSSxHQUNOLGFBQWEsQ0FBQyxNQUFNLEVBQUUsSUFBSSxF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QixhQUFhLENBQUMsT0FBTyxFQUFFLElBQUksRUFBRSxTQUFTLEVBQUUsT0FBTyxDQUNwQyxFQUNYLElBQUksQ0FBQyxDQUFDLENBQUM7U0FDWjtRQUNELEtBQUssT0FBTyxDQUFDLENBQUM7WUFDWixPQUFPLENBQUMsR0FBRyxDQUFDLEtBQUssQ0FDYixhQUFhLENBQUMsT0FBTyxFQUFFLElBQUksRUFBRSxTQUFTLEVBQUUsT0FBTyxDQUFhLEVBQzVELGFBQWEsQ0FBQyxPQUFPLEVBQUUsSUFBSSxFQUFFLFNBQVMsRUFBRSxPQUFPLENBQWEsQ0FBQyxDQUFDLENBQUM7U0FDcEU7UUFDRCxLQUFLLFdBQVcsQ0FBQyxDQUFDO1lBQ2hCLE9BQU8sQ0FBQyxHQUFHLENBQUMsU0FBUyxDQUNqQixhQUFhLENBQUMsR0FBRyxFQUFFLElBQUksRUFBRSxTQUFTLEVBQUUsT0FBTyxDQUFXLENBQUMsQ0FBQyxDQUFDO1NBQzlEO1FBQ0Q7WUFDRSxNQUFNLFNBQVMsQ0FBQyxhQUFhLElBQUksQ0FBQyxFQUFFLHFCQUFxQixDQUFDLENBQUM7S0FDOUQ7QUFDSCxDQUFDLENBQUM7QUFFTixNQUFNLENBQUMsTUFBTSxRQUFRLEdBQUcsVUFBVSxDQUFDIiwic291cmNlc0NvbnRlbnQiOlsiLyoqXG4gKiBAbGljZW5zZVxuICogQ29weXJpZ2h0IDIwMTggR29vZ2xlIExMQy4gQWxsIFJpZ2h0cyBSZXNlcnZlZC5cbiAqIExpY2Vuc2VkIHVuZGVyIHRoZSBBcGFjaGUgTGljZW5zZSwgVmVyc2lvbiAyLjAgKHRoZSBcIkxpY2Vuc2VcIik7XG4gKiB5b3UgbWF5IG5vdCB1c2UgdGhpcyBmaWxlIGV4Y2VwdCBpbiBjb21wbGlhbmNlIHdpdGggdGhlIExpY2Vuc2UuXG4gKiBZb3UgbWF5IG9idGFpbiBhIGNvcHkgb2YgdGhlIExpY2Vuc2UgYXRcbiAqXG4gKiBodHRwOi8vd3d3LmFwYWNoZS5vcmcvbGljZW5zZXMvTElDRU5TRS0yLjBcbiAqXG4gKiBVbmxlc3MgcmVxdWlyZWQgYnkgYXBwbGljYWJsZSBsYXcgb3IgYWdyZWVkIHRvIGluIHdyaXRpbmcsIHNvZnR3YXJlXG4gKiBkaXN0cmlidXRlZCB1bmRlciB0aGUgTGljZW5zZSBpcyBkaXN0cmlidXRlZCBvbiBhbiBcIkFTIElTXCIgQkFTSVMsXG4gKiBXSVRIT1VUIFdBUlJBTlRJRVMgT1IgQ09ORElUSU9OUyBPRiBBTlkgS0lORCwgZWl0aGVyIGV4cHJlc3Mgb3IgaW1wbGllZC5cbiAqIFNlZSB0aGUgTGljZW5zZSBmb3IgdGhlIHNwZWNpZmljIGxhbmd1YWdlIGdvdmVybmluZyBwZXJtaXNzaW9ucyBhbmRcbiAqIGxpbWl0YXRpb25zIHVuZGVyIHRoZSBMaWNlbnNlLlxuICogPT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT1cbiAqL1xuXG5pbXBvcnQge0RhdGFUeXBlLCBUZW5zb3IsIFRlbnNvcjFEfSBmcm9tICdAdGVuc29yZmxvdy90ZmpzLWNvcmUnO1xuLy8gdHNsaW50OmRpc2FibGUtbmV4dC1saW5lOiBuby1pbXBvcnRzLWZyb20tZGlzdFxuaW1wb3J0ICogYXMgdGZPcHMgZnJvbSAnQHRlbnNvcmZsb3cvdGZqcy1jb3JlL2Rpc3Qvb3BzL29wc19mb3JfY29udmVydGVyJztcblxuaW1wb3J0IHtOYW1lZFRlbnNvcnNNYXB9IGZyb20gJy4uLy4uL2RhdGEvdHlwZXMnO1xuaW1wb3J0IHtFeGVjdXRpb25Db250ZXh0fSBmcm9tICcuLi8uLi9leGVjdXRvci9leGVjdXRpb25fY29udGV4dCc7XG5pbXBvcnQge0ludGVybmFsT3BFeGVjdXRvciwgTm9kZX0gZnJvbSAnLi4vdHlwZXMnO1xuXG5pbXBvcnQge2dldFBhcmFtVmFsdWV9IGZyb20gJy4vdXRpbHMnO1xuXG5leHBvcnQgY29uc3QgZXhlY3V0ZU9wOiBJbnRlcm5hbE9wRXhlY3V0b3IgPVxuICAgIChub2RlOiBOb2RlLCB0ZW5zb3JNYXA6IE5hbWVkVGVuc29yc01hcCwgY29udGV4dDogRXhlY3V0aW9uQ29udGV4dCxcbiAgICAgb3BzID0gdGZPcHMpOiBUZW5zb3JbXSA9PiB7XG4gICAgICBzd2l0Y2ggKG5vZGUub3ApIHtcbiAgICAgICAgY2FzZSAnRmlsbCc6IHtcbiAgICAgICAgICBjb25zdCBzaGFwZSA9XG4gICAgICAgICAgICAgIGdldFBhcmFtVmFsdWUoJ3NoYXBlJywgbm9kZSwgdGVuc29yTWFwLCBjb250ZXh0KSBhcyBudW1iZXJbXTtcbiAgICAgICAgICBjb25zdCBkdHlwZSA9XG4gICAgICAgICAgICAgIGdldFBhcmFtVmFsdWUoJ2R0eXBlJywgbm9kZSwgdGVuc29yTWFwLCBjb250ZXh0KSBhcyBEYXRhVHlwZTtcbiAgICAgICAgICBjb25zdCB2YWx1ZSA9XG4gICAgICAgICAgICAgIGdldFBhcmFtVmFsdWUoJ3ZhbHVlJywgbm9kZSwgdGVuc29yTWFwLCBjb250ZXh0KSBhcyBudW1iZXI7XG4gICAgICAgICAgcmV0dXJuIFtvcHMuZmlsbChzaGFwZSwgdmFsdWUsIGR0eXBlKV07XG4gICAgICAgIH1cbiAgICAgICAgY2FzZSAnTGluU3BhY2UnOiB7XG4gICAgICAgICAgY29uc3Qgc3RhcnQgPVxuICAgICAgICAgICAgICBnZXRQYXJhbVZhbHVlKCdzdGFydCcsIG5vZGUsIHRlbnNvck1hcCwgY29udGV4dCkgYXMgbnVtYmVyO1xuICAgICAgICAgIGNvbnN0IHN0b3AgPVxuICAgICAgICAgICAgICBnZXRQYXJhbVZhbHVlKCdzdG9wJywgbm9kZSwgdGVuc29yTWFwLCBjb250ZXh0KSBhcyBudW1iZXI7XG4gICAgICAgICAgY29uc3QgbnVtID0gZ2V0UGFyYW1WYWx1ZSgnbnVtJywgbm9kZSwgdGVuc29yTWFwLCBjb250ZXh0KSBhcyBudW1iZXI7XG4gICAgICAgICAgcmV0dXJuIFtvcHMubGluc3BhY2Uoc3RhcnQsIHN0b3AsIG51bSldO1xuICAgICAgICB9XG4gICAgICAgIGNhc2UgJ011bHRpbm9taWFsJzoge1xuICAgICAgICAgIGNvbnN0IGxvZ2l0cyA9XG4gICAgICAgICAgICAgIGdldFBhcmFtVmFsdWUoJ2xvZ2l0cycsIG5vZGUsIHRlbnNvck1hcCwgY29udGV4dCkgYXMgVGVuc29yMUQ7XG4gICAgICAgICAgY29uc3QgbnVtU2FtcGxlcyA9XG4gICAgICAgICAgICAgIGdldFBhcmFtVmFsdWUoJ251bVNhbXBsZXMnLCBub2RlLCB0ZW5zb3JNYXAsIGNvbnRleHQpIGFzIG51bWJlcjtcbiAgICAgICAgICBjb25zdCBzZWVkID1cbiAgICAgICAgICAgICAgZ2V0UGFyYW1WYWx1ZSgnc2VlZCcsIG5vZGUsIHRlbnNvck1hcCwgY29udGV4dCkgYXMgbnVtYmVyO1xuICAgICAgICAgIHJldHVybiBbb3BzLm11bHRpbm9taWFsKGxvZ2l0cywgbnVtU2FtcGxlcywgc2VlZCldO1xuICAgICAgICB9XG4gICAgICAgIGNhc2UgJ09uZUhvdCc6IHtcbiAgICAgICAgICBjb25zdCBpbmRpY2VzID1cbiAgICAgICAgICAgICAgZ2V0UGFyYW1WYWx1ZSgnaW5kaWNlcycsIG5vZGUsIHRlbnNvck1hcCwgY29udGV4dCkgYXMgVGVuc29yMUQ7XG4gICAgICAgICAgY29uc3QgZGVwdGggPVxuICAgICAgICAgICAgICBnZXRQYXJhbVZhbHVlKCdkZXB0aCcsIG5vZGUsIHRlbnNvck1hcCwgY29udGV4dCkgYXMgbnVtYmVyO1xuICAgICAgICAgIGNvbnN0IG9uVmFsdWUgPVxuICAgICAgICAgICAgICBnZXRQYXJhbVZhbHVlKCdvblZhbHVlJywgbm9kZSwgdGVuc29yTWFwLCBjb250ZXh0KSBhcyBudW1iZXI7XG4gICAgICAgICAgY29uc3Qgb2ZmVmFsdWUgPVxuICAgICAgICAgICAgICBnZXRQYXJhbVZhbHVlKCdvZmZWYWx1ZScsIG5vZGUsIHRlbnNvck1hcCwgY29udGV4dCkgYXMgbnVtYmVyO1xuICAgICAgICAgIGNvbnN0IGR0eXBlID1cbiAgICAgICAgICAgICAgZ2V0UGFyYW1WYWx1ZSgnZHR5cGUnLCBub2RlLCB0ZW5zb3JNYXAsIGNvbnRleHQpIGFzIERhdGFUeXBlO1xuICAgICAgICAgIHJldHVybiBbb3BzLm9uZUhvdChpbmRpY2VzLCBkZXB0aCwgb25WYWx1ZSwgb2ZmVmFsdWUsIGR0eXBlKV07XG4gICAgICAgIH1cbiAgICAgICAgY2FzZSAnT25lcyc6IHtcbiAgICAgICAgICByZXR1cm4gW29wcy5vbmVzKFxuICAgICAgICAgICAgICBnZXRQYXJhbVZhbHVlKCdzaGFwZScsIG5vZGUsIHRlbnNvck1hcCwgY29udGV4dCkgYXMgbnVtYmVyW10sXG4gICAgICAgICAgICAgIGdldFBhcmFtVmFsdWUoJ2R0eXBlJywgbm9kZSwgdGVuc29yTWFwLCBjb250ZXh0KSBhcyBEYXRhVHlwZSldO1xuICAgICAgICB9XG4gICAgICAgIGNhc2UgJ09uZXNMaWtlJzoge1xuICAgICAgICAgIHJldHVybiBbb3BzLm9uZXNMaWtlKFxuICAgICAgICAgICAgICBnZXRQYXJhbVZhbHVlKCd4Jywgbm9kZSwgdGVuc29yTWFwLCBjb250ZXh0KSBhcyBUZW5zb3IpXTtcbiAgICAgICAgfVxuICAgICAgICBjYXNlICdSYW5kb21TdGFuZGFyZE5vcm1hbCc6IHtcbiAgICAgICAgICByZXR1cm4gW29wcy5yYW5kb21TdGFuZGFyZE5vcm1hbChcbiAgICAgICAgICAgICAgZ2V0UGFyYW1WYWx1ZSgnc2hhcGUnLCBub2RlLCB0ZW5zb3JNYXAsIGNvbnRleHQpIGFzIG51bWJlcltdLFxuICAgICAgICAgICAgICBnZXRQYXJhbVZhbHVlKCdkdHlwZScsIG5vZGUsIHRlbnNvck1hcCwgY29udGV4dCkgYXMgJ2Zsb2F0MzInIHxcbiAgICAgICAgICAgICAgICAgICdpbnQzMicsXG4gICAgICAgICAgICAgIGdldFBhcmFtVmFsdWUoJ3NlZWQnLCBub2RlLCB0ZW5zb3JNYXAsIGNvbnRleHQpIGFzIG51bWJlcildO1xuICAgICAgICB9XG4gICAgICAgIGNhc2UgJ1JhbmRvbVVuaWZvcm0nOiB7XG4gICAgICAgICAgcmV0dXJuIFtvcHMucmFuZG9tVW5pZm9ybShcbiAgICAgICAgICAgICAgLy8gdHNsaW50OmRpc2FibGUtbmV4dC1saW5lOm5vLWFueVxuICAgICAgICAgICAgICBnZXRQYXJhbVZhbHVlKCdzaGFwZScsIG5vZGUsIHRlbnNvck1hcCwgY29udGV4dCkgYXMgYW55LFxuICAgICAgICAgICAgICBnZXRQYXJhbVZhbHVlKCdtaW52YWwnLCBub2RlLCB0ZW5zb3JNYXAsIGNvbnRleHQpIGFzIG51bWJlcixcbiAgICAgICAgICAgICAgZ2V0UGFyYW1WYWx1ZSgnbWF4dmFsJywgbm9kZSwgdGVuc29yTWFwLCBjb250ZXh0KSBhcyBudW1iZXIsXG4gICAgICAgICAgICAgIGdldFBhcmFtVmFsdWUoJ2R0eXBlJywgbm9kZSwgdGVuc29yTWFwLCBjb250ZXh0KSBhcyBEYXRhVHlwZSldO1xuICAgICAgICB9XG4gICAgICAgIGNhc2UgJ1JhbmdlJzoge1xuICAgICAgICAgIGNvbnN0IHN0YXJ0ID1cbiAgICAgICAgICAgICAgZ2V0UGFyYW1WYWx1ZSgnc3RhcnQnLCBub2RlLCB0ZW5zb3JNYXAsIGNvbnRleHQpIGFzIG51bWJlcjtcbiAgICAgICAgICBjb25zdCBzdG9wID1cbiAgICAgICAgICAgICAgZ2V0UGFyYW1WYWx1ZSgnc3RvcCcsIG5vZGUsIHRlbnNvck1hcCwgY29udGV4dCkgYXMgbnVtYmVyO1xuICAgICAgICAgIGNvbnN0IHN0ZXAgPVxuICAgICAgICAgICAgICBnZXRQYXJhbVZhbHVlKCdzdGVwJywgbm9kZSwgdGVuc29yTWFwLCBjb250ZXh0KSBhcyBudW1iZXI7XG4gICAgICAgICAgcmV0dXJuIFtvcHMucmFuZ2UoXG4gICAgICAgICAgICAgIHN0YXJ0LCBzdG9wLCBzdGVwLFxuICAgICAgICAgICAgICBnZXRQYXJhbVZhbHVlKCdkdHlwZScsIG5vZGUsIHRlbnNvck1hcCwgY29udGV4dCkgYXMgJ2Zsb2F0MzInIHxcbiAgICAgICAgICAgICAgICAgICdpbnQzMicpXTtcbiAgICAgICAgfVxuICAgICAgICBjYXNlICdUcnVuY2F0ZWROb3JtYWwnOiB7XG4gICAgICAgICAgY29uc3Qgc2hhcGUgPVxuICAgICAgICAgICAgICBnZXRQYXJhbVZhbHVlKCdzaGFwZScsIG5vZGUsIHRlbnNvck1hcCwgY29udGV4dCkgYXMgbnVtYmVyW107XG4gICAgICAgICAgY29uc3QgbWVhbiA9XG4gICAgICAgICAgICAgIGdldFBhcmFtVmFsdWUoJ21lYW4nLCBub2RlLCB0ZW5zb3JNYXAsIGNvbnRleHQpIGFzIG51bWJlcjtcbiAgICAgICAgICBjb25zdCBzdGREZXYgPVxuICAgICAgICAgICAgICBnZXRQYXJhbVZhbHVlKCdzdGREZXYnLCBub2RlLCB0ZW5zb3JNYXAsIGNvbnRleHQpIGFzIG51bWJlcjtcbiAgICAgICAgICBjb25zdCBzZWVkID1cbiAgICAgICAgICAgICAgZ2V0UGFyYW1WYWx1ZSgnc2VlZCcsIG5vZGUsIHRlbnNvck1hcCwgY29udGV4dCkgYXMgbnVtYmVyO1xuICAgICAgICAgIHJldHVybiBbb3BzLnRydW5jYXRlZE5vcm1hbChcbiAgICAgICAgICAgICAgc2hhcGUsIG1lYW4sIHN0ZERldixcbiAgICAgICAgICAgICAgZ2V0UGFyYW1WYWx1ZSgnZHR5cGUnLCBub2RlLCB0ZW5zb3JNYXAsIGNvbnRleHQpIGFzICdmbG9hdDMyJyB8XG4gICAgICAgICAgICAgICAgICAnaW50MzInLFxuICAgICAgICAgICAgICBzZWVkKV07XG4gICAgICAgIH1cbiAgICAgICAgY2FzZSAnWmVyb3MnOiB7XG4gICAgICAgICAgcmV0dXJuIFtvcHMuemVyb3MoXG4gICAgICAgICAgICAgIGdldFBhcmFtVmFsdWUoJ3NoYXBlJywgbm9kZSwgdGVuc29yTWFwLCBjb250ZXh0KSBhcyBudW1iZXJbXSxcbiAgICAgICAgICAgICAgZ2V0UGFyYW1WYWx1ZSgnZHR5cGUnLCBub2RlLCB0ZW5zb3JNYXAsIGNvbnRleHQpIGFzIERhdGFUeXBlKV07XG4gICAgICAgIH1cbiAgICAgICAgY2FzZSAnWmVyb3NMaWtlJzoge1xuICAgICAgICAgIHJldHVybiBbb3BzLnplcm9zTGlrZShcbiAgICAgICAgICAgICAgZ2V0UGFyYW1WYWx1ZSgneCcsIG5vZGUsIHRlbnNvck1hcCwgY29udGV4dCkgYXMgVGVuc29yKV07XG4gICAgICAgIH1cbiAgICAgICAgZGVmYXVsdDpcbiAgICAgICAgICB0aHJvdyBUeXBlRXJyb3IoYE5vZGUgdHlwZSAke25vZGUub3B9IGlzIG5vdCBpbXBsZW1lbnRlZGApO1xuICAgICAgfVxuICAgIH07XG5cbmV4cG9ydCBjb25zdCBDQVRFR09SWSA9ICdjcmVhdGlvbic7XG4iXX0=