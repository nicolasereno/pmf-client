import { Injectable } from '@angular/core';
import { createPatch, Operation } from 'rfc6902';
import { GeoObject, Mask, _Answer, _GeoObject, _Mask, _Question, _Relation } from '../model/model';


@Injectable({ providedIn: 'root' })
export class DifferencesService {

	createGeoObjectDifference(o1: GeoObject, o2: GeoObject) {
		console.debug(JSON.stringify(o1));
		console.debug(JSON.stringify(o2));

		let patch = createPatch(o1, o2);
		if (patch.length == 0)
			return null;
		const _geoObject: _GeoObject = { id: o1.id, code: o2.code, operationType: this.operationType(o2.id) };
		this.modifiedGeoObjectProperties(patch).forEach(p => _geoObject[p] = o2[p]);

		const rr = this.modifiedGeoObjectMaskMappings(patch);
		if (rr.length > 0) {
			_geoObject.relations = [];
			rr.forEach(r => {
				const relation = o2.geoObjectMaskMappings[r];
				const _relation: _Relation = { id: relation.id, operationType: this.operationType(relation.id), relationType: o1.geoObjectMaskMappings[r].relationType, order: o2.geoObjectMaskMappings[r].order };
				this.modifiedGeoObjectMaskMappingsProperties(r, patch).forEach(p => _relation[p] = relation[p]);
				_relation.id = Math.abs(relation.id);
				// Patch per cicli di modifica lato backend
				_relation['geoObjId'] = o1.id;
				_geoObject.relations.push(_relation);
			});
		}
		console.debug(JSON.stringify(_geoObject));
		_geoObject.patch = btoa(JSON.stringify(o2));
		return _geoObject;
	}

	createMaskDifference(o1: Mask, o2: Mask): _Mask {
		console.debug(JSON.stringify(o1));
		console.debug(JSON.stringify(o2));

		let patch = createPatch(o1, o2);
		if (patch.length == 0)
			return null;
		const _mask: _Mask = { id: o1.id, code: o2.code, operationType: this.operationType(o2.id) };
		this.modifiedMaskProperties(patch).forEach(p => _mask[p] = o2[p]);

		const qq = this.modifiedQuestions(patch);
		if (qq.length > 0) {
			_mask.questions = [];
			qq.forEach(q => {
				const question = o2.questions[q];
				const _question: _Question = { code: question.code, operationType: this.operationType(question.id) };
				this.modifiedQuestionProperties(q, patch).forEach(p => _question[p] = question[p]);
				_question.id = Math.abs(question.id);
				const aa = this.modifiedQuestionAnswers(q, patch);
				if (_question.operationType != 'DEL' && aa.length > 0) {
					_question.answers = [];
					aa.forEach(a => {
						const answer = question.answers[a];
						const _answer: _Answer = { code: answer.code, operationType: this.operationType(answer.id) };
						this.modifiedQuestionAnswerProperties(q, a, patch).forEach(p => _answer[p] = answer[p]);
						_answer.id = Math.abs(answer.id);
						_question.answers.push(_answer);
					});
				}
				_mask.questions.push(_question);
			});
		}
		console.debug(JSON.stringify(_mask));
		_mask.patch = btoa(JSON.stringify(o2));
		return _mask;
	}

	private operationType(id: number) {
		return id == null ? 'ADD' : (id < 0 ? 'DEL' : 'MOD');
	}

	private extractString(patch: Operation[], start: string, index: number, exclude?: string) {
		return this.distinct(patch.map(e => e.path).filter(o => o.startsWith(start)).map(e => e.split('/')[index]).filter(e => exclude == null || e != exclude));
	}

	private extractNumber(patch: Operation[], start: string, index: number) {
		return this.distinct(patch.map(e => e.path).filter(o => o.startsWith(start)).map(e => +e.split('/')[index]));
	}

	private modifiedMaskProperties(patch: Operation[]) {
		return this.extractString(patch, '/', 1, 'questions');
	}

	private modifiedQuestions(patch: Operation[]) {
		return this.extractNumber(patch, '/questions/', 2)
	}

	private modifiedQuestionProperties(question: number, patch: Operation[]) {
		return this.extractString(patch, '/questions/' + question + '/', 3, 'answers');
	}

	private modifiedQuestionAnswers(question: number, patch: Operation[]) {
		return this.extractNumber(patch, '/questions/' + question + '/answers/', 4);
	}

	private modifiedQuestionAnswerProperties(question: number, answer: number, patch: Operation[]) {
		return this.extractString(patch, '/questions/' + question + '/answers/' + answer + '/', 5);
	}

	private distinct(arrayWithDuplicates: any[]) {
		return arrayWithDuplicates.filter((n, i) => arrayWithDuplicates.indexOf(n) === i);
	}

	private modifiedGeoObjectProperties(patch: Operation[]) {
		return this.extractString(patch, '/', 1, 'geoObjectMaskMappings');
	}

	private modifiedGeoObjectMaskMappings(patch: Operation[]) {
		return this.extractNumber(patch, '/geoObjectMaskMappings/', 2)
	}

	private modifiedGeoObjectMaskMappingsProperties(relation: number, patch: Operation[]) {
		return this.extractString(patch, '/geoObjectMaskMappings/' + relation + '/', 3);
	}

}
