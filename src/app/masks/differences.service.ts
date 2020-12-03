import { Injectable } from '@angular/core';

import { createPatch, Operation } from 'rfc6902';

import { Mask } from '../model/model';

export interface Difference {
	masks: any;
	geoObjects: any;
	answerCodes: any;
}


@Injectable({ providedIn: 'root' })
export class DifferencesService {

	createMaskDifference(o1: Mask, o2: Mask): Difference {
		let patch = createPatch(o1, o2);
		if (patch.length == 0)
			return null;
		let difference: Difference = {
			masks: [],
			geoObjects: [],
			answerCodes: [],
		};
		difference.masks.push({ 'id': o1.id, 'code': o2.code, patch: JSON.stringify(patch) });
		difference.masks[0]['operationType'] = o2.id == null ? 'INS' : (o2.id < 0 ? 'DEL' : 'MOD');

		const qq = this.modifiedQuestions(patch);
		if (qq.length > 0) {
			difference.masks[0]['questions'] = [];
			qq.forEach(q => {
				const qm = { id: o2.questions[q]['id'], code: o2.questions[q]['code'] };
				qm['operationType'] = qm.id == null ? 'INS' : (qm.id < 0 ? 'DEL' : 'MOD');
				const qmp = this.modifiedQuestionProperties(q, patch);
				qmp.forEach(p => qm[p] = o2.questions[q][p]);
				qm.id = o1.questions[q]['id']
				const aa = this.modifiedQuestionAnswers(q, patch);
				if (qm['operationType'] != 'DEL' && aa.length > 0) {
					qm['answers'] = [];
					aa.forEach(a => {
						const am = { id:  o2.questions[q].answers[a]['id'], code: o2.questions[q].answers[a]['code'] };
						const amp = this.modifiedQuestionAnswerProperties(q, a, patch);
						amp.forEach(p => am[p] = o2.questions[q].answers[a][p]);
						am['operationType'] = am.id == null ? 'INS' : (am.id < 0 ? 'DEL' : 'MOD');
						am.id =  o1.questions[q].answers[a]['id'];
						qm['answers'].push(am);
					});
				}
				difference.masks[0]['questions'].push(qm);
			});
		}
		console.debug(JSON.stringify(difference));
		this.modifiedQuestions(patch);
		return difference;
	}

	private modifiedQuestions(patch: Operation[]) {
		const questions = patch.map(e => e.path).filter(o => o.startsWith('/questions/')).map(e => +e.split('/')[2]);
		return this.distinct(questions);
	}

	private modifiedQuestionProperties(question: number, patch: Operation[]) {
		const attributes = patch.map(e => e.path).filter(o => o.startsWith('/questions/' + question + '/') && !o.startsWith('/questions/' + question + '/answers/')).map(e => e.split('/')[3]);
		return this.distinct(attributes);
	}

	private modifiedQuestionAnswers(question: number, patch: Operation[]) {
		const answers = patch.map(e => e.path).filter(o => o.startsWith('/questions/' + question + '/answers/')).map(e => +e.split('/')[4]);
		return this.distinct(answers);
	}

	private modifiedQuestionAnswerProperties(question: number, answer: number, patch: Operation[]) {
		const attributes = patch.map(e => e.path).filter(o => o.startsWith('/questions/' + question + '/answers/' + answer + '/')).map(e => e.split('/')[5]);
		return this.distinct(attributes);
	}


	private distinct(arrayWithDuplicates: any[]) {
		return arrayWithDuplicates.filter((n, i) => arrayWithDuplicates.indexOf(n) === i);
	}
}