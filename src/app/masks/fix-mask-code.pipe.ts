import { Pipe, PipeTransform } from '@angular/core';
import { Mask } from '../model/model';


@Pipe({ name: 'fixMaskCode' })
export class FixMaskCodePipe implements PipeTransform {
	transform(m: Mask): string {
		if (m.code.length == 6)
			return m.paymentList.prefix + m.code;
		else return m.code;
	}
}
