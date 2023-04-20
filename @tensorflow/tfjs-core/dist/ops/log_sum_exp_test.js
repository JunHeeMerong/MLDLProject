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
import * as tf from '../index';
import { ALL_ENVS, describeWithFlags } from '../jasmine_util';
import { expectArraysClose, expectArraysEqual } from '../test_util';
describeWithFlags('logSumExp', ALL_ENVS, () => {
    it('0', async () => {
        const a = tf.scalar(0);
        const result = tf.logSumExp(a);
        expectArraysClose(await result.data(), 0);
    });
    it('basic', async () => {
        const a = tf.tensor1d([1, 2, -3]);
        const result = tf.logSumExp(a);
        expectArraysClose(await result.data(), Math.log(Math.exp(1) + Math.exp(2) + Math.exp(-3)));
    });
    it('propagates NaNs', async () => {
        const a = tf.tensor1d([1, 2, NaN]);
        const result = tf.logSumExp(a);
        expectArraysEqual(await result.data(), NaN);
    });
    it('axes=0 in 2D array', async () => {
        const a = tf.tensor2d([1, 2, 3, 0, 0, 1], [3, 2]);
        const r = tf.logSumExp(a, [0]);
        expect(r.shape).toEqual([2]);
        const expected = [
            Math.log(Math.exp(1) + Math.exp(3) + Math.exp(0)),
            Math.log(Math.exp(2) + Math.exp(0) + Math.exp(1))
        ];
        expectArraysClose(await r.data(), expected);
    });
    it('axes=0 in 2D array, keepDims', async () => {
        const a = tf.tensor2d([1, 2, 3, 0, 0, 1], [3, 2]);
        const r = tf.logSumExp(a, [0], true /* keepDims */);
        expect(r.shape).toEqual([1, 2]);
        const expected = [
            Math.log(Math.exp(1) + Math.exp(3) + Math.exp(0)),
            Math.log(Math.exp(2) + Math.exp(0) + Math.exp(1))
        ];
        expectArraysClose(await r.data(), expected);
    });
    it('axes=1 in 2D array', async () => {
        const a = tf.tensor2d([1, 2, 3, 0, 0, 1], [3, 2]);
        const res = tf.logSumExp(a, [1]);
        expect(res.shape).toEqual([3]);
        const expected = [
            Math.log(Math.exp(1) + Math.exp(2)),
            Math.log(Math.exp(3) + Math.exp(0)),
            Math.log(Math.exp(0) + Math.exp(1)),
        ];
        expectArraysClose(await res.data(), expected);
    });
    it('axes = -1 in 2D array', async () => {
        const a = tf.tensor2d([1, 2, 3, 0, 0, 1], [3, 2]);
        const res = tf.logSumExp(a, -1);
        expect(res.shape).toEqual([3]);
        const expected = [
            Math.log(Math.exp(1) + Math.exp(2)),
            Math.log(Math.exp(3) + Math.exp(0)),
            Math.log(Math.exp(0) + Math.exp(1)),
        ];
        expectArraysClose(await res.data(), expected);
    });
    it('2D, axes=1 provided as a single digit', async () => {
        const a = tf.tensor2d([1, 2, 3, 0, 0, 1], [2, 3]);
        const res = tf.logSumExp(a, 1);
        expect(res.shape).toEqual([2]);
        const expected = [
            Math.log(Math.exp(1) + Math.exp(2) + Math.exp(3)),
            Math.log(Math.exp(0) + Math.exp(0) + Math.exp(1))
        ];
        expectArraysClose(await res.data(), expected);
    });
    it('axes=0,1 in 2D array', async () => {
        const a = tf.tensor2d([1, 2, 3, 0, 0, 1], [3, 2]);
        const res = tf.logSumExp(a, [0, 1]);
        expect(res.shape).toEqual([]);
        const expected = [Math.log(Math.exp(1) + Math.exp(2) + Math.exp(3) + Math.exp(0) + Math.exp(0) +
                Math.exp(1))];
        expectArraysClose(await res.data(), expected);
    });
    it('throws when passed a non-tensor', () => {
        expect(() => tf.logSumExp({}))
            .toThrowError(/Argument 'x' passed to 'logSumExp' must be a Tensor/);
    });
    it('accepts a tensor-like object', async () => {
        const result = tf.logSumExp([1, 2, -3]);
        expectArraysClose(await result.data(), Math.log(Math.exp(1) + Math.exp(2) + Math.exp(-3)));
    });
    it('throws error for string tensor', () => {
        expect(() => tf.logSumExp(['a']))
            .toThrowError(/Argument 'x' passed to 'logSumExp' must be numeric tensor/);
    });
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibG9nX3N1bV9leHBfdGVzdC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uLy4uL3RmanMtY29yZS9zcmMvb3BzL2xvZ19zdW1fZXhwX3Rlc3QudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7Ozs7Ozs7Ozs7Ozs7OztHQWVHO0FBRUgsT0FBTyxLQUFLLEVBQUUsTUFBTSxVQUFVLENBQUM7QUFDL0IsT0FBTyxFQUFDLFFBQVEsRUFBRSxpQkFBaUIsRUFBQyxNQUFNLGlCQUFpQixDQUFDO0FBQzVELE9BQU8sRUFBQyxpQkFBaUIsRUFBRSxpQkFBaUIsRUFBQyxNQUFNLGNBQWMsQ0FBQztBQUVsRSxpQkFBaUIsQ0FBQyxXQUFXLEVBQUUsUUFBUSxFQUFFLEdBQUcsRUFBRTtJQUM1QyxFQUFFLENBQUMsR0FBRyxFQUFFLEtBQUssSUFBSSxFQUFFO1FBQ2pCLE1BQU0sQ0FBQyxHQUFHLEVBQUUsQ0FBQyxNQUFNLENBQUMsQ0FBQyxDQUFDLENBQUM7UUFDdkIsTUFBTSxNQUFNLEdBQUcsRUFBRSxDQUFDLFNBQVMsQ0FBQyxDQUFDLENBQUMsQ0FBQztRQUMvQixpQkFBaUIsQ0FBQyxNQUFNLE1BQU0sQ0FBQyxJQUFJLEVBQUUsRUFBRSxDQUFDLENBQUMsQ0FBQztJQUM1QyxDQUFDLENBQUMsQ0FBQztJQUVILEVBQUUsQ0FBQyxPQUFPLEVBQUUsS0FBSyxJQUFJLEVBQUU7UUFDckIsTUFBTSxDQUFDLEdBQUcsRUFBRSxDQUFDLFFBQVEsQ0FBQyxDQUFDLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDO1FBQ2xDLE1BQU0sTUFBTSxHQUFHLEVBQUUsQ0FBQyxTQUFTLENBQUMsQ0FBQyxDQUFDLENBQUM7UUFFL0IsaUJBQWlCLENBQ2IsTUFBTSxNQUFNLENBQUMsSUFBSSxFQUFFLEVBQ25CLElBQUksQ0FBQyxHQUFHLENBQUMsSUFBSSxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUMsR0FBRyxJQUFJ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LENBQUMsT0FBTyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQztRQUMvQixNQUFNLFFBQVEsR0FBRztZQUNmLElBQUksQ0FBQyxHQUFHLENBQUMsSUFBSSxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUMsR0FBRyxJQUFJLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxHQUFHLElBQUksQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDLENBQUM7WUFDakQsSUFBSSxDQUFDLEdBQUcsQ0FBQyxJQUFJLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxHQUFHLElBQUksQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDLEdBQUcsSUFBSSxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUMsQ0FBQztTQUNsRCxDQUFDO1FBQ0YsaUJBQWlCLENBQUMsTUFBTSxHQUFHLENBQUMsSUFBSSxFQUFFLEVBQUUsUUFBUSxDQUFDLENBQUM7SUFDaEQsQ0FBQyxDQUFDLENBQUM7SUFFSCxFQUFFLENBQUMsc0JBQXNCLEVBQUUsS0FBSyxJQUFJLEVBQUU7UUFDcEMsTUFBTSxDQUFDLEdBQUcsRUFBRSxDQUFDLFFBQVEsQ0FBQyxDQUFDLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxDQUFDLENBQUMsQ0FBQztRQUNsRCxNQUFNLEdBQUcsR0FBRyxFQUFFLENBQUMsU0FBUyxDQUFDLENBQUMsRUFBRSxDQUFDLENBQUMsRUFBRSxDQUFDLENBQUMsQ0FBQyxDQUFDO1FBRXBDLE1BQU0sQ0FBQyxHQUFHLENBQUMsS0FBSyxDQUFDLENBQUMsT0FBTyxDQUFDLEVBQUUsQ0FBQyxDQUFDO1FBQzlCLE1BQU0sUUFBUSxHQUFHLENBQUMsSUFBSSxDQUFDLEdBQUcsQ0FDdEIsSUFBSSxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUMsR0FBRyxJQUFJLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxHQUFHLElBQUksQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDLEdBQUcsSUFBSSxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUMsR0FBRyxJQUFJLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQztnQkFDbkUsSUFBSSxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUM7UUFDbEIsaUJBQWlCLENBQUMsTUFBTSxHQUFHLENBQUMsSUFBSSxFQUFFLEVBQUUsUUFBUSxDQUFDLENBQUM7SUFDaEQsQ0FBQyxDQUFDLENBQUM7SUFFSCxFQUFFLENBQUMsaUNBQWlDLEVBQUUsR0FBRyxFQUFFO1FBQ3pDLE1BQU0sQ0FBQyxHQUFHLEVBQUUsQ0FBQyxFQUFFLENBQUMsU0FBUyxDQUFDLEVBQWUsQ0FBQyxDQUFDO2FBQ3RDLFlBQVksQ0FBQyxxREFBcUQsQ0FBQyxDQUFDO0lBQzNFLENBQUMsQ0FBQyxDQUFDO0lBRUgsRUFBRSxDQUFDLDhCQUE4QixFQUFFLEtBQUssSUFBSSxFQUFFO1FBQzVDLE1BQU0sTUFBTSxHQUFHLEVBQUUsQ0FBQyxTQUFTLENBQUMsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQztRQUN4QyxpQkFBaUIsQ0FDYixNQUFNLE1BQU0sQ0FBQyxJQUFJLEVBQUUsRUFDbkIsSUFBSSxDQUFDLEdBQUcsQ0FBQyxJQUFJLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxHQUFHLElBQUksQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDLEdBQUcsSUFBSSxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQztJQUMxRCxDQUFDLENBQUMsQ0FBQztJQUVILEVBQUUsQ0FBQyxnQ0FBZ0MsRUFBRSxHQUFHLEVBQUU7UUFDeEMsTUFBTSxDQUFDLEdBQUcsRUFBRSxDQUFDLEVBQUUsQ0FBQyxTQUFTLENBQUMsQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDO2FBQzVCLFlBQVksQ0FDVCwyREFBMkQsQ0FBQyxDQUFDO0lBQ3ZFLENBQUMsQ0FBQyxDQUFDO0FBQ0wsQ0FBQyxDQUFDLENBQUMiLCJzb3VyY2VzQ29udGVudCI6WyIvKipcbiAqIEBsaWNlbnNlXG4gKiBDb3B5cmlnaHQgMjAyMCBHb29nbGUgTExDLiBBbGwgUmlnaHRzIFJlc2VydmVkLlxuICogTGljZW5zZWQgdW5kZXIgdGhlIEFwYWNoZSBMaWNlbnNlLCBWZXJzaW9uIDIuMCAodGhlIFwiTGljZW5zZVwiKTtcbiAqIHlvdSBtYXkgbm90IHVzZSB0aGlzIGZpbGUgZXhjZXB0IGluIGNvbXBsaWFuY2Ugd2l0aCB0aGUgTGljZW5zZS5cbiAqIFlvdSBtYXkgb2J0YWluIGEgY29weSBvZiB0aGUgTGljZW5zZSBhdFxuICpcbiAqIGh0dHA6Ly93d3cuYXBhY2hlLm9yZy9saWNlbnNlcy9MSUNFTlNFLTIuMFxuICpcbiAqIFVubGVzcyByZXF1aXJlZCBieSBhcHBsaWNhYmxlIGxhdyBvciBhZ3JlZWQgdG8gaW4gd3JpdGluZywgc29mdHdhcmVcbiAqIGRpc3RyaWJ1dGVkIHVuZGVyIHRoZSBMaWNlbnNlIGlzIGRpc3RyaWJ1dGVkIG9uIGFuIFwiQVMgSVNcIiBCQVNJUyxcbiAqIFdJVEhPVVQgV0FSUkFOVElFUyBPUiBDT05ESVRJT05TIE9GIEFOWSBLSU5ELCBlaXRoZXIgZXhwcmVzcyBvciBpbXBsaWVkLlxuICogU2VlIHRoZSBMaWNlbnNlIGZvciB0aGUgc3BlY2lmaWMgbGFuZ3VhZ2UgZ292ZXJuaW5nIHBlcm1pc3Npb25zIGFuZFxuICogbGltaXRhdGlvbnMgdW5kZXIgdGhlIExpY2Vuc2UuXG4gKiA9PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PVxuICovXG5cbmltcG9ydCAqIGFzIHRmIGZyb20gJy4uL2luZGV4JztcbmltcG9ydCB7QUxMX0VOVlMsIGRlc2NyaWJlV2l0aEZsYWdzfSBmcm9tICcuLi9qYXNtaW5lX3V0aWwnO1xuaW1wb3J0IHtleHBlY3RBcnJheXNDbG9zZSwgZXhwZWN0QXJyYXlzRXF1YWx9IGZyb20gJy4uL3Rlc3RfdXRpbCc7XG5cbmRlc2NyaWJlV2l0aEZsYWdzKCdsb2dTdW1FeHAnLCBBTExfRU5WUywgKCkgPT4ge1xuICBpdCgnMCcsIGFzeW5jICgpID0+IHtcbiAgICBjb25zdCBhID0gdGYuc2NhbGFyKDApO1xuICAgIGNvbnN0IHJlc3VsdCA9IHRmLmxvZ1N1bUV4cChhKTtcbiAgICBleHBlY3RBcnJheXNDbG9zZShhd2FpdCByZXN1bHQuZGF0YSgpLCAwKTtcbiAgfSk7XG5cbiAgaXQoJ2Jhc2ljJywgYXN5bmMgKCkgPT4ge1xuICAgIGNvbnN0IGEgPSB0Zi50ZW5zb3IxZChbMSwgMiwgLTNdKTtcbiAgICBjb25zdCByZXN1bHQgPSB0Zi5sb2dTdW1FeHAoYSk7XG5cbiAgICBleHBlY3RBcnJheXNDbG9zZShcbiAgICAgICAgYXdhaXQgcmVzdWx0LmRhdGEoKSxcbiAgICAgICAgTWF0aC5sb2coTWF0aC5leHAoMSkgKyBNYXRoLmV4cCgyKSArIE1hdGguZXhwKC0zKSkpO1xuICB9KTtcblxuICBpdCgncHJvcGFnYXRlcyBOYU5zJywgYXN5bmMgKCkgPT4ge1xuICAgIGNvbnN0IGEgPSB0Zi50ZW5zb3IxZChbMSwgMiwgTmFOXSk7XG4gICAgY29uc3QgcmVzdWx0ID0gdGYubG9nU3VtRXhwKGEpO1xuICAgIGV4cGVjdEFycmF5c0VxdWFsKGF3YWl0IHJlc3VsdC5kYXRhKCksIE5hTik7XG4gIH0pO1xuXG4gIGl0KCdheGVzPTAgaW4gMkQgYXJyYXknLCBhc3luYyAoKSA9PiB7XG4gICAgY29uc3QgYSA9IHRmLnRlbnNvcjJkKFsxLCAyLCAzLCAwLCAwLCAxXSwgWzMsIDJdKTtcbiAgICBjb25zdCByID0gdGYubG9nU3VtRXhwKGEsIFswXSk7XG5cbiAgICBleHBlY3Qoci5zaGFwZSkudG9FcXVhbChbMl0pO1xuICAgIGNvbnN0IGV4cGVjdGVkID0gW1xuICAgICAgTWF0aC5sb2coTWF0aC5leHAoMSkgKyBNYXRoLmV4cCgzKSArIE1hdGguZXhwKDApKSxcbiAgICAgIE1hdGgubG9nKE1hdGguZXhwKDIpICsgTWF0aC5leHAoMCkgKyBNYXRoLmV4cCgxKSlcbiAgICBdO1xuICAgIGV4cGVjdEFycmF5c0Nsb3NlKGF3YWl0IHIuZGF0YSgpLCBleHBlY3RlZCk7XG4gIH0pO1xuXG4gIGl0KCdheGVzPTAgaW4gMkQgYXJyYXksIGtlZXBEaW1zJywgYXN5bmMgKCkgPT4ge1xuICAgIGNvbnN0IGEgPSB0Zi50ZW5zb3IyZChbMSwgMiwgMywgMCwgMCwgMV0sIFszLCAyXSk7XG4gICAgY29uc3QgciA9IHRmLmxvZ1N1bUV4cChhLCBbMF0sIHRydWUgLyoga2VlcERpbXMgKi8pO1xuXG4gICAgZXhwZWN0KHIuc2hhcGUpLnRvRXF1YWwoWzEsIDJdKTtcbiAgICBjb25zdCBleHBlY3RlZCA9IFtcbiAgICAgIE1hdGgubG9nKE1hdGguZXhwKDEpICsgTWF0aC5leHAoMykgKyBNYXRoLmV4cCgwKSksXG4gICAgICBNYXRoLmxvZyhNYXRoLmV4cCgyKSArIE1hdGguZXhwKDApICsgTWF0aC5leHAoMSkpXG4gICAgXTtcbiAgICBleHBlY3RBcnJheXNDbG9zZShhd2FpdCByLmRhdGEoKSwgZXhwZWN0ZWQpO1xuICB9KTtcblxuICBpdCgnYXhlcz0xIGluIDJEIGFycmF5JywgYXN5bmMgKCkgPT4ge1xuICAgIGNvbnN0IGEgPSB0Zi50ZW5zb3IyZChbMSwgMiwgMywgMCwgMCwgMV0sIFszLCAyXSk7XG4gICAgY29uc3QgcmVzID0gdGYubG9nU3VtRXhwKGEsIFsxXSk7XG5cbiAgICBleHBlY3QocmVzLnNoYXBlKS50b0VxdWFsKFszXSk7XG4gICAgY29uc3QgZXhwZWN0ZWQgPSBbXG4gICAgICBNYXRoLmxvZyhNYXRoLmV4cCgxKSArIE1hdGguZXhwKDIpKSxcbiAgICAgIE1hdGgubG9nKE1hdGguZXhwKDMpICsgTWF0aC5leHAoMCkpLFxuICAgICAgTWF0aC5sb2coTWF0aC5leHAoMCkgKyBNYXRoLmV4cCgxKSksXG4gICAgXTtcbiAgICBleHBlY3RBcnJheXNDbG9zZShhd2FpdCByZXMuZGF0YSgpLCBleHBlY3RlZCk7XG4gIH0pO1xuXG4gIGl0KCdheGVzID0gLTEgaW4gMkQgYXJyYXknLCBhc3luYyAoKSA9PiB7XG4gICAgY29uc3QgYSA9IHRmLnRlbnNvcjJkKFsxLCAyLCAzLCAwLCAwLCAxXSwgWzMsIDJdKTtcbiAgICBjb25zdCByZXMgPSB0Zi5sb2dTdW1FeHAoYSwgLTEpO1xuXG4gICAgZXhwZWN0KHJlcy5zaGFwZSkudG9FcXVhbChbM10pO1xuICAgIGNvbnN0IGV4cGVjdGVkID0gW1xuICAgICAgTWF0aC5sb2coTWF0aC5leHAoMSkgKyBNYXRoLmV4cCgyKSksXG4gICAgICBNYXRoLmxvZyhNYXRoLmV4cCgzKSArIE1hdGguZXhwKDApKSxcbiAgICAgIE1hdGgubG9nKE1hdGguZXhwKDApICsgTWF0aC5leHAoMSkpLFxuICAgIF07XG4gICAgZXhwZWN0QXJyYXlzQ2xvc2UoYXdhaXQgcmVzLmRhdGEoKSwgZXhwZWN0ZWQpO1xuICB9KTtcblxuICBpdCgnMkQsIGF4ZXM9MSBwcm92aWRlZCBhcyBhIHNpbmdsZSBkaWdpdCcsIGFzeW5jICgpID0+IHtcbiAgICBjb25zdCBhID0gdGYudGVuc29yMmQoWzEsIDIsIDMsIDAsIDAsIDFdLCBbMiwgM10pO1xuICAgIGNvbnN0IHJlcyA9IHRmLmxvZ1N1bUV4cChhLCAxKTtcblxuICAgIGV4cGVjdChyZXMuc2hhcGUpLnRvRXF1YWwoWzJdKTtcbiAgICBjb25zdCBleHBlY3RlZCA9IFtcbiAgICAgIE1hdGgubG9nKE1hdGguZXhwKDEpICsgTWF0aC5leHAoMikgKyBNYXRoLmV4cCgzKSksXG4gICAgICBNYXRoLmxvZyhNYXRoLmV4cCgwKSArIE1hdGguZXhwKDApICsgTWF0aC5leHAoMSkpXG4gICAgXTtcbiAgICBleHBlY3RBcnJheXNDbG9zZShhd2FpdCByZXMuZGF0YSgpLCBleHBlY3RlZCk7XG4gIH0pO1xuXG4gIGl0KCdheGVzPTAsMSBpbiAyRCBhcnJheScsIGFzeW5jICgpID0+IHtcbiAgICBjb25zdCBhID0gdGYudGVuc29yMmQoWzEsIDIsIDMsIDAsIDAsIDFdLCBbMywgMl0pO1xuICAgIGNvbnN0IHJlcyA9IHRmLmxvZ1N1bUV4cChhLCBbMCwgMV0pO1xuXG4gICAgZXhwZWN0KHJlcy5zaGFwZSkudG9FcXVhbChbXSk7XG4gICAgY29uc3QgZXhwZWN0ZWQgPSBbTWF0aC5sb2coXG4gICAgICAgIE1hdGguZXhwKDEpICsgTWF0aC5leHAoMikgKyBNYXRoLmV4cCgzKSArIE1hdGguZXhwKDApICsgTWF0aC5leHAoMCkgK1xuICAgICAgICBNYXRoLmV4cCgxKSldO1xuICAgIGV4cGVjdEFycmF5c0Nsb3NlKGF3YWl0IHJlcy5kYXRhKCksIGV4cGVjdGVkKTtcbiAgfSk7XG5cbiAgaXQoJ3Rocm93cyB3aGVuIHBhc3NlZCBhIG5vbi10ZW5zb3InLCAoKSA9PiB7XG4gICAgZXhwZWN0KCgpID0+IHRmLmxvZ1N1bUV4cCh7fSBhcyB0Zi5UZW5zb3IpKVxuICAgICAgICAudG9UaHJvd0Vycm9yKC9Bcmd1bWVudCAneCcgcGFzc2VkIHRvICdsb2dTdW1FeHAnIG11c3QgYmUgYSBUZW5zb3IvKTtcbiAgfSk7XG5cbiAgaXQoJ2FjY2VwdHMgYSB0ZW5zb3ItbGlrZSBvYmplY3QnLCBhc3luYyAoKSA9PiB7XG4gICAgY29uc3QgcmVzdWx0ID0gdGYubG9nU3VtRXhwKFsxLCAyLCAtM10pO1xuICAgIGV4cGVjdEFycmF5c0Nsb3NlKFxuICAgICAgICBhd2FpdCByZXN1bHQuZGF0YSgpLFxuICAgICAgICBNYXRoLmxvZyhNYXRoLmV4cCgxKSArIE1hdGguZXhwKDIpICsgTWF0aC5leHAoLTMpKSk7XG4gIH0pO1xuXG4gIGl0KCd0aHJvd3MgZXJyb3IgZm9yIHN0cmluZyB0ZW5zb3InLCAoKSA9PiB7XG4gICAgZXhwZWN0KCgpID0+IHRmLmxvZ1N1bUV4cChbJ2EnXSkpXG4gICAgICAgIC50b1Rocm93RXJyb3IoXG4gICAgICAgICAgICAvQXJndW1lbnQgJ3gnIHBhc3NlZCB0byAnbG9nU3VtRXhwJyBtdXN0IGJlIG51bWVyaWMgdGVuc29yLyk7XG4gIH0pO1xufSk7XG4iXX0=