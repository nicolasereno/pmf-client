import { MatPaginatorIntl } from '@angular/material/paginator';
import { Injectable } from '@angular/core';

@Injectable()
export class MatPaginatorIntlIt extends MatPaginatorIntl {
	itemsPerPageLabel = 'Elementi per pagina';
	nextPageLabel = 'Pagina successiva';
	previousPageLabel = 'Pagina precedente';
	firstPageLabel = 'Prima pagina';
	lastPageLabel = 'Ultima pagina';

	getRangeLabel = function(page, pageSize, length) {
		if (length === 0 || pageSize === 0) {
			return '0 od ' + length;
		}
		length = Math.max(length, 0);
		const startIndex = page * pageSize;
		const endIndex = startIndex < length ?
			Math.min(startIndex + pageSize, length) :
			startIndex + pageSize;
		return startIndex + 1 + ' - ' + endIndex + ' di ' + length;
	};

}