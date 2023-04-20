/**
 * @license
 * Copyright 2018 Google LLC
 *
 * Use of this source code is governed by an MIT-style
 * license that can be found in the LICENSE file or at
 * https://opensource.org/licenses/MIT.
 * =============================================================================
 */
// We can't easily extract a string[] from the string union type, but we can
// recapitulate the list, enforcing at compile time that the values are valid.
/**
 * A string array of valid NormalizationLayer class names.
 *
 * This is guaranteed to match the `NormalizationLayerClassName` union
 * type.
 */
export const normalizationLayerClassNames = [
    'BatchNormalization',
];
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibm9ybWFsaXphdGlvbl9zZXJpYWxpemF0aW9uLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vLi4vLi4vLi4vdGZqcy1sYXllcnMvc3JjL2tlcmFzX2Zvcm1hdC9sYXllcnMvbm9ybWFsaXphdGlvbl9zZXJpYWxpemF0aW9uLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBOzs7Ozs7OztHQVFHO0FBaUNILDRFQUE0RTtBQUM1RSw4RUFBOEU7QUFFOUU7Ozs7O0dBS0c7QUFDSCxNQUFNLENBQUMsTUFBTSw0QkFBNEIsR0FBa0M7SUFDekUsb0JBQW9CO0NBQ3JCLENBQUMiLCJzb3VyY2VzQ29udGVudCI6WyIvKipcbiAqIEBsaWNlbnNlXG4gKiBDb3B5cmlnaHQgMjAxOCBHb29nbGUgTExDXG4gKlxuICogVXNlIG9mIHRoaXMgc291cmNlIGNvZGUgaXMgZ292ZXJuZWQgYnkgYW4gTUlULXN0eWxlXG4gKiBsaWNlbnNlIHRoYXQgY2FuIGJlIGZvdW5kIGluIHRoZSBMSUNFTlNFIGZpbGUgb3IgYXRcbiAqIGh0dHBzOi8vb3BlbnNvdXJjZS5vcmcvbGljZW5zZXMvTUlULlxuICogPT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT1cbiAqL1xuXG5pbXBvcnQge0NvbnN0cmFpbnRTZXJpYWxpemF0aW9ufSBmcm9tICcuLi9jb25zdHJhaW50X2NvbmZpZyc7XG5pbXBvcnQge0luaXRpYWxpemVyU2VyaWFsaXphdGlvbn0gZnJvbSAnLi4vaW5pdGlhbGl6ZXJfY29uZmlnJztcbmltcG9ydCB7UmVndWxhcml6ZXJTZXJpYWxpemF0aW9ufSBmcm9tICcuLi9yZWd1bGFyaXplcl9jb25maWcnO1xuaW1wb3J0IHtCYXNlTGF5ZXJTZXJpYWxpemF0aW9uLCBMYXllckNvbmZpZ30gZnJvbSAnLi4vdG9wb2xvZ3lfY29uZmlnJztcblxuZXhwb3J0IGludGVyZmFjZSBCYXRjaE5vcm1hbGl6YXRpb25MYXllckNvbmZpZyBleHRlbmRzIExheWVyQ29uZmlnIHtcbiAgYXhpcz86IG51bWJlcjtcbiAgbW9tZW50dW0/OiBudW1iZXI7XG4gIGVwc2lsb24/OiBudW1iZXI7XG4gIGNlbnRlcj86IGJvb2xlYW47XG4gIHNjYWxlPzogYm9vbGVhbjtcbiAgYmV0YV9pbml0aWFsaXplcj86IEluaXRpYWxpemVyU2VyaWFsaXphdGlvbjtcbiAgZ2FtbWFfaW5pdGlhbGl6ZXI/OiBJbml0aWFsaXplclNlcmlhbGl6YXRpb247XG4gIG1vdmluZ19tZWFuX2luaXRpYWxpemVyPzogSW5pdGlhbGl6ZXJTZXJpYWxpemF0aW9uO1xuICBtb3ZpbmdfdmFyaWFuY2VfaW5pdGlhbGl6ZXI/OiBJbml0aWFsaXplclNlcmlhbGl6YXRpb247XG4gIGJldGFfY29uc3RyYWludD86IENvbnN0cmFpbnRTZXJpYWxpemF0aW9uO1xuICBnYW1tYV9jb25zdHJhaW50PzogQ29uc3RyYWludFNlcmlhbGl6YXRpb247XG4gIGJldGFfcmVndWxhcml6ZXI/OiBSZWd1bGFyaXplclNlcmlhbGl6YXRpb247XG4gIGdhbW1hX3JlZ3VsYXJpemVyPzogUmVndWxhcml6ZXJTZXJpYWxpemF0aW9uO1xufVxuXG4vLyBVcGRhdGUgYmF0Y2hOb3JtYWxpemF0aW9uTGF5ZXJDbGFzc05hbWVzIGJlbG93IGluIGNvbmNlcnQgd2l0aCB0aGlzLlxuZXhwb3J0IHR5cGUgQmF0Y2hOb3JtYWxpemF0aW9uTGF5ZXJTZXJpYWxpemF0aW9uID1cbiAgICBCYXNlTGF5ZXJTZXJpYWxpemF0aW9uPCdCYXRjaE5vcm1hbGl6YXRpb24nLCBCYXRjaE5vcm1hbGl6YXRpb25MYXllckNvbmZpZz47XG5cbmV4cG9ydCB0eXBlIE5vcm1hbGl6YXRpb25MYXllclNlcmlhbGl6YXRpb24gPVxuICAgIEJhdGNoTm9ybWFsaXphdGlvbkxheWVyU2VyaWFsaXphdGlvbjtcblxuZXhwb3J0IHR5cGUgTm9ybWFsaXphdGlvbkxheWVyQ2xhc3NOYW1lID1cbiAgICBOb3JtYWxpemF0aW9uTGF5ZXJTZXJpYWxpemF0aW9uWydjbGFzc19uYW1lJ107XG5cbi8vIFdlIGNhbid0IGVhc2lseSBleHRyYWN0IGEgc3RyaW5nW10gZnJvbSB0aGUgc3RyaW5nIHVuaW9uIHR5cGUsIGJ1dCB3ZSBjYW5cbi8vIHJlY2FwaXR1bGF0ZSB0aGUgbGlzdCwgZW5mb3JjaW5nIGF0IGNvbXBpbGUgdGltZSB0aGF0IHRoZSB2YWx1ZXMgYXJlIHZhbGlkLlxuXG4vKipcbiAqIEEgc3RyaW5nIGFycmF5IG9mIHZhbGlkIE5vcm1hbGl6YXRpb25MYXllciBjbGFzcyBuYW1lcy5cbiAqXG4gKiBUaGlzIGlzIGd1YXJhbnRlZWQgdG8gbWF0Y2ggdGhlIGBOb3JtYWxpemF0aW9uTGF5ZXJDbGFzc05hbWVgIHVuaW9uXG4gKiB0eXBlLlxuICovXG5leHBvcnQgY29uc3Qgbm9ybWFsaXphdGlvbkxheWVyQ2xhc3NOYW1lczogTm9ybWFsaXphdGlvbkxheWVyQ2xhc3NOYW1lW10gPSBbXG4gICdCYXRjaE5vcm1hbGl6YXRpb24nLFxuXTtcbiJdfQ==