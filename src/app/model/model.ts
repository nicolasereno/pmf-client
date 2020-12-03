export interface BaseResponse<T> {
	body: T;
	code?: string;
	description?: string;
	errorCode?: string;
	errorPlaceholders?: Array<string>;
}

export interface GeoObject {
    code?: string;
    description?: string;
    id?: number;
    relations?: Relation[];
    version?: string;
}

export interface MetricCalculation {
    answerCondition?: string;
    checkCondition?: string;
    edKey?: RemapType;
    edType?: RemapType;
    executor?: RemapType;
    id?: number;
    note?: string;
    parteEc?: RemapType;
    paymentList?: PaymentList;
    provisionCode?: ProvisionCode;
    quantity?: string;
    questionCategory?: RemapType;
}

export interface ProvisionCode {
    code?: string;
    id?: number;
    note?: string;
    provisionType?: RemapType;
}

export interface Relation {
    mask?: Mask;
    order?: number;
    relationType?: string;
}

export interface TechSite {
	code?: string;
	id?: number;
	tip?: string;
}

export interface PaymentList {
	code?: string;
	id?: number;
	prefix?: string;
}

export interface RemapType {
	id?: number;
	infoParam?: string;
	infoValue?: string;
}

export interface Mask {
	code?: string;
	description?: string;
	id?: number;
	paymentList?: PaymentList;
	techSite?: TechSite;
	tecnicalMask?: string;
	tisp?: string;
	version?: string;
	questions?: Question[];
}

export interface Question {
	category?: RemapType;
	code?: string;
	copyFlag?: string;
	dataType?: RemapType;
	description?: string;
	id?: number;
	maxLength?: string;
	measurementUnit?: RemapType;
	modFlag?: string;
	note?: string;
	priority?: number;
	requiredFlag?: string;
	type?: RemapType;
	visibilityCond?: string;
	visibilityFlag?: string;
	answers?: Answer[];
}

export interface Answer {
	category?: RemapType;
	citAnag?: number;
	code?: string;
	defaultAns?: string;
	description?: string;
	executor?: RemapType;
	highLimit?: string;
	id?: number;
	lowLimit?: string;
	note?: string;
	priority?: number;
	type?: string;
	visibilityCond?: string;
}

// Objects for Deltas
export interface _Mask extends Mask {
	operationType?: string
	patch?: string;
	questions?: _Question[];
}

export interface _Question extends Question {
	operationType?: string
	answers?: _Answer[];
}

export interface _Answer extends Answer {
	operationType?: string
}
