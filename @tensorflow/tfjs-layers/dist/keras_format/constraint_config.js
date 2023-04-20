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
// recapitulate the list, enforcing at compile time that the values are valid
// and that we have the right number of them.
/**
 * A string array of valid Constraint class names.
 *
 * This is guaranteed to match the `ConstraintClassName` union type.
 */
export const constraintClassNames = ['MaxNorm', 'UnitNorm', 'NonNeg', 'MinMaxNorm'];
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY29uc3RyYWludF9jb25maWcuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi8uLi8uLi90ZmpzLWxheWVycy9zcmMva2VyYXNfZm9ybWF0L2NvbnN0cmFpbnRfY29uZmlnLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBOzs7Ozs7OztHQVFHO0FBb0NILDRFQUE0RTtBQUM1RSw2RUFBNkU7QUFDN0UsNkNBQTZDO0FBRTdDOzs7O0dBSUc7QUFDSCxNQUFNLENBQUMsTUFBTSxvQkFBb0IsR0FDN0IsQ0FBQyxTQUFTLEVBQUUsVUFBVSxFQUFFLFFBQVEsRUFBRSxZQUFZLENBQUMsQ0FBQyIsInNvdXJjZXNDb250ZW50IjpbIi8qKlxuICogQGxpY2Vuc2VcbiAqIENvcHlyaWdodCAyMDE4IEdvb2dsZSBMTENcbiAqXG4gKiBVc2Ugb2YgdGhpcyBzb3VyY2UgY29kZSBpcyBnb3Zlcm5lZCBieSBhbiBNSVQtc3R5bGVcbiAqIGxpY2Vuc2UgdGhhdCBjYW4gYmUgZm91bmQgaW4gdGhlIExJQ0VOU0UgZmlsZSBvciBhdFxuICogaHR0cHM6Ly9vcGVuc291cmNlLm9yZy9saWNlbnNlcy9NSVQuXG4gKiA9PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PVxuICovXG5cbmltcG9ydCB7QmFzZVNlcmlhbGl6YXRpb259IGZyb20gJy4vdHlwZXMnO1xuXG5leHBvcnQgdHlwZSBNYXhOb3JtQ29uZmlnID0ge1xuICBtYXhfdmFsdWU/OiBudW1iZXI7XG4gIGF4aXM/OiBudW1iZXI7XG59O1xuXG5leHBvcnQgdHlwZSBNYXhOb3JtU2VyaWFsaXphdGlvbiA9IEJhc2VTZXJpYWxpemF0aW9uPCdNYXhOb3JtJywgTWF4Tm9ybUNvbmZpZz47XG5cbmV4cG9ydCB0eXBlIFVuaXROb3JtQ29uZmlnID0ge1xuICBheGlzPzogbnVtYmVyO1xufTtcblxuZXhwb3J0IHR5cGUgVW5pdE5vcm1TZXJpYWxpemF0aW9uID1cbiAgICBCYXNlU2VyaWFsaXphdGlvbjwnVW5pdE5vcm0nLCBVbml0Tm9ybUNvbmZpZz47XG5cbmV4cG9ydCB0eXBlIE5vbk5lZ1NlcmlhbGl6YXRpb24gPSBCYXNlU2VyaWFsaXphdGlvbjwnTm9uTmVnJywgbnVsbD47XG5cbmV4cG9ydCB0eXBlIE1pbk1heE5vcm1Db25maWcgPSB7XG4gIG1pbl92YWx1ZT86IG51bWJlcjtcbiAgbWF4X3ZhbHVlPzogbnVtYmVyO1xuICBheGlzPzogbnVtYmVyO1xuICByYXRlPzogbnVtYmVyO1xufTtcblxuZXhwb3J0IHR5cGUgTWluTWF4Tm9ybVNlcmlhbGl6YXRpb24gPVxuICAgIEJhc2VTZXJpYWxpemF0aW9uPCdNaW5NYXhOb3JtJywgTWluTWF4Tm9ybUNvbmZpZz47XG5cbi8vIFVwZGF0ZSBjb25zdHJhaW50Q2xhc3NOYW1lcyBiZWxvdyBpbiBjb25jZXJ0IHdpdGggdGhpcy5cbmV4cG9ydCB0eXBlIENvbnN0cmFpbnRTZXJpYWxpemF0aW9uID0gTWF4Tm9ybVNlcmlhbGl6YXRpb258Tm9uTmVnU2VyaWFsaXphdGlvbnxcbiAgICBVbml0Tm9ybVNlcmlhbGl6YXRpb258TWluTWF4Tm9ybVNlcmlhbGl6YXRpb247XG5cbmV4cG9ydCB0eXBlIENvbnN0cmFpbnRDbGFzc05hbWUgPSBDb25zdHJhaW50U2VyaWFsaXphdGlvblsnY2xhc3NfbmFtZSddO1xuXG4vLyBXZSBjYW4ndCBlYXNpbHkgZXh0cmFjdCBhIHN0cmluZ1tdIGZyb20gdGhlIHN0cmluZyB1bmlvbiB0eXBlLCBidXQgd2UgY2FuXG4vLyByZWNhcGl0dWxhdGUgdGhlIGxpc3QsIGVuZm9yY2luZyBhdCBjb21waWxlIHRpbWUgdGhhdCB0aGUgdmFsdWVzIGFyZSB2YWxpZFxuLy8gYW5kIHRoYXQgd2UgaGF2ZSB0aGUgcmlnaHQgbnVtYmVyIG9mIHRoZW0uXG5cbi8qKlxuICogQSBzdHJpbmcgYXJyYXkgb2YgdmFsaWQgQ29uc3RyYWludCBjbGFzcyBuYW1lcy5cbiAqXG4gKiBUaGlzIGlzIGd1YXJhbnRlZWQgdG8gbWF0Y2ggdGhlIGBDb25zdHJhaW50Q2xhc3NOYW1lYCB1bmlvbiB0eXBlLlxuICovXG5leHBvcnQgY29uc3QgY29uc3RyYWludENsYXNzTmFtZXM6IENvbnN0cmFpbnRDbGFzc05hbWVbXSA9XG4gICAgWydNYXhOb3JtJywgJ1VuaXROb3JtJywgJ05vbk5lZycsICdNaW5NYXhOb3JtJ107XG4iXX0=