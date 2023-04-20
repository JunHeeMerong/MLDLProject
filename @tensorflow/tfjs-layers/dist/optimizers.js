/**
 * @license
 * Copyright 2018 Google LLC
 *
 * Use of this source code is governed by an MIT-style
 * license that can be found in the LICENSE file or at
 * https://opensource.org/licenses/MIT.
 * =============================================================================
 */
/**
 * Optimizers.
 */
import { train } from '@tensorflow/tfjs-core';
import { epsilon } from './backend/common';
import { ValueError } from './errors';
// Add (de)serialize()
// Porting note: This diverges from the PyKeras implementation and may need to
// change based on (de)serialization requirements.
export function getOptimizer(identifier) {
    const optimizerMap = {
        'Adagrad': () => train.adagrad(0.01),
        'Adadelta': () => train.adadelta(1, 0.95, epsilon()),
        'Adam': () => train.adam(0.001, 0.9, 0.999, epsilon()),
        'Adamax': () => train.adamax(0.002, 0.9, 0.999, epsilon(), 0),
        'RMSProp': () => train.rmsprop(0.001, 0.9, 0, epsilon()),
        'SGD': () => train.sgd(0.01)
    };
    optimizerMap['adagrad'] = optimizerMap['Adagrad'];
    optimizerMap['adadelta'] = optimizerMap['Adadelta'];
    optimizerMap['adam'] = optimizerMap['Adam'];
    optimizerMap['adamax'] = optimizerMap['Adamax'];
    optimizerMap['rmsprop'] = optimizerMap['RMSProp'];
    optimizerMap['sgd'] = optimizerMap['SGD'];
    if (identifier in optimizerMap) {
        return optimizerMap[identifier]();
    }
    throw new ValueError(`Unknown Optimizer ${identifier}`);
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoib3B0aW1pemVycy5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uL3RmanMtbGF5ZXJzL3NyYy9vcHRpbWl6ZXJzLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBOzs7Ozs7OztHQVFHO0FBRUg7O0dBRUc7QUFFSCxPQUFPLEVBQVksS0FBSyxFQUFDLE1BQU0sdUJBQXVCLENBQUM7QUFFdkQsT0FBTyxFQUFDLE9BQU8sRUFBQyxNQUFNLGtCQUFrQixDQUFDO0FBRXpDLE9BQU8sRUFBQyxVQUFVLEVBQUMsTUFBTSxVQUFVLENBQUM7QUFFcEMsc0JBQXNCO0FBRXRCLDhFQUE4RTtBQUM5RSxrREFBa0Q7QUFDbEQsTUFBTSxVQUFVLFlBQVksQ0FBQyxVQUFrQjtJQUM3QyxNQUFNLFlBQVksR0FBK0M7UUFDL0QsU0FBUyxFQUFFLEdBQUcsRUFBRSxDQUFDLEtBQUssQ0FBQyxPQUFPLENBQUMsSUFBSSxDQUFDO1FBQ3BDLFVBQVUsRUFBRSxHQUFHLEVBQUUsQ0FBQyxLQUFLLENBQUMsUUFBUSxDQUFDLENBQUMsRUFBRSxJQUFJLEVBQUUsT0FBTyxFQUFFLENBQUM7UUFDcEQsTUFBTSxFQUFFLEdBQUcsRUFBRSxDQUFDLEtBQUssQ0FBQyxJQUFJLENBQUMsS0FBSyxFQUFFLEdBQUcsRUFBRSxLQUFLLEVBQUUsT0FBTyxFQUFFLENBQUM7UUFDdEQsUUFBUSxFQUFFLEdBQUcsRUFBRSxDQUFDLEtBQUssQ0FBQyxNQUFNLENBQUMsS0FBSyxFQUFFLEdBQUcsRUFBRSxLQUFLLEVBQUUsT0FBTyxFQUFFLEVBQUUsQ0FBQyxDQUFDO1FBQzdELFNBQVMsRUFBRSxHQUFHLEVBQUUsQ0FBQyxLQUFLLENBQUMsT0FBTyxDQUFDLEtBQUssRUFBRSxHQUFHLEVBQUUsQ0FBQyxFQUFFLE9BQU8sRUFBRSxDQUFDO1FBQ3hELEtBQUssRUFBRSxHQUFHLEVBQUUsQ0FBQyxLQUFLLENBQUMsR0FBRyxDQUFDLElBQUksQ0FBQztLQUM3QixDQUFDO0lBQ0YsWUFBWSxDQUFDLFNBQVMsQ0FBQyxHQUFHLFlBQVksQ0FBQyxTQUFTLENBQUMsQ0FBQztJQUNsRCxZQUFZLENBQUMsVUFBVSxDQUFDLEdBQUcsWUFBWSxDQUFDLFVBQVUsQ0FBQyxDQUFDO0lBQ3BELFlBQVksQ0FBQyxNQUFNLENBQUMsR0FBRyxZQUFZLENBQUMsTUFBTSxDQUFDLENBQUM7SUFDNUMsWUFBWSxDQUFDLFFBQVEsQ0FBQyxHQUFHLFlBQVksQ0FBQyxRQUFRLENBQUMsQ0FBQztJQUNoRCxZQUFZLENBQUMsU0FBUyxDQUFDLEdBQUcsWUFBWSxDQUFDLFNBQVMsQ0FBQyxDQUFDO0lBQ2xELFlBQVksQ0FBQyxLQUFLLENBQUMsR0FBRyxZQUFZLENBQUMsS0FBSyxDQUFDLENBQUM7SUFFMUMsSUFBSSxVQUFVLElBQUksWUFBWSxFQUFFO1FBQzlCLE9BQU8sWUFBWSxDQUFDLFVBQVUsQ0FBQyxFQUFFLENBQUM7S0FDbkM7SUFDRCxNQUFNLElBQUksVUFBVSxDQUFDLHFCQUFxQixVQUFVLEVBQUUsQ0FBQyxDQUFDO0FBQzFELENBQUMiLCJzb3VyY2VzQ29udGVudCI6WyIvKipcbiAqIEBsaWNlbnNlXG4gKiBDb3B5cmlnaHQgMjAxOCBHb29nbGUgTExDXG4gKlxuICogVXNlIG9mIHRoaXMgc291cmNlIGNvZGUgaXMgZ292ZXJuZWQgYnkgYW4gTUlULXN0eWxlXG4gKiBsaWNlbnNlIHRoYXQgY2FuIGJlIGZvdW5kIGluIHRoZSBMSUNFTlNFIGZpbGUgb3IgYXRcbiAqIGh0dHBzOi8vb3BlbnNvdXJjZS5vcmcvbGljZW5zZXMvTUlULlxuICogPT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT1cbiAqL1xuXG4vKipcbiAqIE9wdGltaXplcnMuXG4gKi9cblxuaW1wb3J0IHtPcHRpbWl6ZXIsIHRyYWlufSBmcm9tICdAdGVuc29yZmxvdy90ZmpzLWNvcmUnO1xuXG5pbXBvcnQge2Vwc2lsb259IGZyb20gJy4vYmFja2VuZC9jb21tb24nO1xuXG5pbXBvcnQge1ZhbHVlRXJyb3J9IGZyb20gJy4vZXJyb3JzJztcblxuLy8gQWRkIChkZSlzZXJpYWxpemUoKVxuXG4vLyBQb3J0aW5nIG5vdGU6IFRoaXMgZGl2ZXJnZXMgZnJvbSB0aGUgUHlLZXJhcyBpbXBsZW1lbnRhdGlvbiBhbmQgbWF5IG5lZWQgdG9cbi8vIGNoYW5nZSBiYXNlZCBvbiAoZGUpc2VyaWFsaXphdGlvbiByZXF1aXJlbWVudHMuXG5leHBvcnQgZnVuY3Rpb24gZ2V0T3B0aW1pemVyKGlkZW50aWZpZXI6IHN0cmluZyk6IE9wdGltaXplciB7XG4gIGNvbnN0IG9wdGltaXplck1hcDoge1tvcHRpbWl6ZXJOYW1lOiBzdHJpbmddOiAoKSA9PiBPcHRpbWl6ZXJ9ID0ge1xuICAgICdBZGFncmFkJzogKCkgPT4gdHJhaW4uYWRhZ3JhZCgwLjAxKSxcbiAgICAnQWRhZGVsdGEnOiAoKSA9PiB0cmFpbi5hZGFkZWx0YSgxLCAwLjk1LCBlcHNpbG9uKCkpLFxuICAgICdBZGFtJzogKCkgPT4gdHJhaW4uYWRhbSgwLjAwMSwgMC45LCAwLjk5OSwgZXBzaWxvbigpKSxcbiAgICAnQWRhbWF4JzogKCkgPT4gdHJhaW4uYWRhbWF4KDAuMDAyLCAwLjksIDAuOTk5LCBlcHNpbG9uKCksIDApLFxuICAgICdSTVNQcm9wJzogKCkgPT4gdHJhaW4ucm1zcHJvcCgwLjAwMSwgMC45LCAwLCBlcHNpbG9uKCkpLFxuICAgICdTR0QnOiAoKSA9PiB0cmFpbi5zZ2QoMC4wMSlcbiAgfTtcbiAgb3B0aW1pemVyTWFwWydhZGFncmFkJ10gPSBvcHRpbWl6ZXJNYXBbJ0FkYWdyYWQnXTtcbiAgb3B0aW1pemVyTWFwWydhZGFkZWx0YSddID0gb3B0aW1pemVyTWFwWydBZGFkZWx0YSddO1xuICBvcHRpbWl6ZXJNYXBbJ2FkYW0nXSA9IG9wdGltaXplck1hcFsnQWRhbSddO1xuICBvcHRpbWl6ZXJNYXBbJ2FkYW1heCddID0gb3B0aW1pemVyTWFwWydBZGFtYXgnXTtcbiAgb3B0aW1pemVyTWFwWydybXNwcm9wJ10gPSBvcHRpbWl6ZXJNYXBbJ1JNU1Byb3AnXTtcbiAgb3B0aW1pemVyTWFwWydzZ2QnXSA9IG9wdGltaXplck1hcFsnU0dEJ107XG5cbiAgaWYgKGlkZW50aWZpZXIgaW4gb3B0aW1pemVyTWFwKSB7XG4gICAgcmV0dXJuIG9wdGltaXplck1hcFtpZGVudGlmaWVyXSgpO1xuICB9XG4gIHRocm93IG5ldyBWYWx1ZUVycm9yKGBVbmtub3duIE9wdGltaXplciAke2lkZW50aWZpZXJ9YCk7XG59XG4iXX0=