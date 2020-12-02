import { Injectable } from '@angular/core';

import { createPatch, Operation } from 'rfc6902';

import { Mask } from '../model/model';

export interface Difference {
	view: any;
	patch: Operation[];
}


@Injectable({ providedIn: 'root' })
export class DifferencesService {

	createMaskDifference(o1: Mask, o2: Mask): Difference {
		let patch = createPatch(o1, o2);
		if (patch.length == 0)
			return null;
		let difference: Difference = {
			view: {},
			patch: patch
		};
		difference.view['mask'] = { 'id': o2.id, 'code': o2.code };
		difference.view['mask']['operationType'] = o2.id == null ? 'INS' : (o2.id < 0 ? 'DEL' : 'MOD');
		console.debug('Patch: ' + JSON.stringify(patch));

		console.debug('MaskId: ' + o2.id);
		const qq = this.modifiedQuestions(patch);
		if (qq.length > 0) {
			difference.view['questions'] = [];
			qq.forEach(q => {
				console.debug('  QuestionId: ' + o2.questions[q]['id']);
				const qm = { id: o2.questions[q]['id'], code: o2.questions[q]['code'] };
				qm['operationType'] = qm.id == null ? 'INS' : (qm.id < 0 ? 'DEL' : 'MOD');
				const aa = this.modifiedAnswers(q, patch);
				if (qm['operationType'] != 'DEL' && aa.length > 0) {
					qm['answers'] = [];
					aa.forEach(a => {
						console.debug('    AnswerId: ' + o2.questions[q].answers[a].id)
						const am = { id: o2.questions[q].answers[a]['id'], code: o2.questions[q].answers[a]['code'] };
						am['operationType'] = am.id == null ? 'INS' : (am.id < 0 ? 'DEL' : 'MOD');
						qm['answers'].push(am);
					});
				}
				difference.view['questions'].push(qm);
			});
		}
		console.log(JSON.stringify(difference.view));
		this.modifiedQuestions(patch);
		return difference;
	}

	private modifiedQuestions(patch: Operation[]) {
		const questions = patch.map(e => e.path).filter(o => o.startsWith('/questions/')).map(e => +e.split('/')[2]);
		return this.distinct(questions);
	}

	private modifiedAnswers(question: number, patch: Operation[]) {
		const answers = patch.map(e => e.path).filter(o => o.startsWith('/questions/' + question + '/answers/')).map(e => +e.split('/')[4]);
		return this.distinct(answers);
	}

	private distinct(arrayWithDuplicates: number[]) {
		return arrayWithDuplicates.filter((n, i) => arrayWithDuplicates.indexOf(n) === i);
	}
}