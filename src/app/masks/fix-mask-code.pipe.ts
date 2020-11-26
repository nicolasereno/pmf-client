import { Pipe, PipeTransform } from '@angular/core';
import { MaskResponse } from '@enel/pmf-be';

@Pipe({ name: 'fixMaskCode' })
export class FixMaskCodePipe implements PipeTransform {
	transform(m: MaskResponse): string {
		if (m.code.length == 6)
			return m.paymentList.prefix + m.code;
		else return m.code;
	}
}