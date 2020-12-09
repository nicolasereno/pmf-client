export interface BaseResponse<T> {
	body: T;
	code?: string;
	description?: string;
	errorCode?: string;
	errorPlaceholders?: Array<string>;
}

export interface GeoObject {
	id?: number;
	code?: string;
	description?: string;
	relations?: Relation[];
	version?: string;
}

export interface MetricCalculation {
	id?: number;
	answerCondition?: string;
	checkCondition?: string;
	edKey?: RemapType;
	edType?: RemapType;
	executor?: RemapType;
	note?: string;
	parteEc?: RemapType;
	paymentList?: PaymentList;
	provisionCode?: ProvisionCode;
	quantity?: string;
	questionCategory?: RemapType;
}

export interface ProvisionCode {
	id?: number;
	code?: string;
	note?: string;
	provisionType?: RemapType;
}

export interface Relation {
	id?: number;
	order?: number;
	relationType?: string;
	mask?: MaskRef;
}

export interface TechSite {
	id?: number;
	code?: string;
	tip?: string;
}

export interface Cit {
	id?: number;
	code?: string;
	desc?: string;
}

export interface PaymentList {
	id?: number;
	code?: string;
	prefix?: string;
}

export interface RemapType {
	id?: number;
	infoParam?: string;
	infoValue?: string;
}

export interface MaskRef {
	id?: number;
	code?: string;
	description?: string;
}

export interface Mask extends MaskRef {
	paymentList?: PaymentList;
	techSite?: TechSite;
	tecnicalMask?: string;
	tisp?: string;
	version?: string;
	questions?: Question[];
}

export interface Question {
	id?: number;
	code?: string;
	priority?: number;
	category?: RemapType;
	copyFlag?: string;
	dataType?: RemapType;
	description?: string;
	maxLength?: string;
	measurementUnit?: RemapType;
	modFlag?: string;
	note?: string;
	requiredFlag?: string;
	type?: RemapType;
	visibilityCond?: string;
	visibilityFlag?: string;
	answers?: Answer[];
}

export interface Answer {
	id?: number;
	code?: string;
	category?: RemapType;
	cit?: Cit;
	defaultAns?: string;
	description?: string;
	executor?: RemapType;
	highLimit?: string;
	lowLimit?: string;
	note?: string;
	priority?: number;
	type?: string;
	visibilityCond?: string;
}

// Objects for Deltas
export interface _Mask extends Mask {
	operationType?: 'INS' | 'MOD' | 'DEL'
	patch?: string;
	questions?: _Question[];
}

export interface _Question extends Question {
	operationType?: 'INS' | 'MOD' | 'DEL'
	answers?: _Answer[];
}

export interface _Answer extends Answer {
	operationType?: 'INS' | 'MOD' | 'DEL'
}

export interface _GeoObject extends GeoObject {
	operationType?: 'INS' | 'MOD' | 'DEL'
	patch?: string;
	relations?: _Relation[];
}

export interface _Relation extends Relation {
	operationType?: 'INS' | 'MOD' | 'DEL'
}
