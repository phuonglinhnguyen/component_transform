export const EFFECT_KEY ={
   MUST_EQUAL:'must_equal',
   CONTAIN:'contain',
   REGEX:'regex',
   FUNCTION:'func',
}
export const EFFECT_TITLE_SHORT={
   [EFFECT_KEY.MUST_EQUAL]:"Eq",
   [EFFECT_KEY.CONTAIN]:"Contain",
   [EFFECT_KEY.REGEX]:"Regex",
   [EFFECT_KEY.FUNCTION]:"Func",
}
export const EFFECT_TITLE={
   [EFFECT_KEY.MUST_EQUAL]:"Must Equal",
   [EFFECT_KEY.CONTAIN]:"Contain",
   [EFFECT_KEY.REGEX]:"Regular Expression",
   [EFFECT_KEY.FUNCTION]:"Function",
}