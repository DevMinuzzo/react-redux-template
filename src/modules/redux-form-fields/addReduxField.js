import React from 'react'
import { Field, FieldArray } from 'redux-form'
import validator from '../form-validator/form-validator'

/* INPUT */
export const addField = (BaseComponent) => ({ name, validationRules, ...props }) => {
  const validateRules = validator.createValidationRules(validationRules)
  return (
    <Field name={name} component={BaseComponent} validate={validateRules} {...props} />
  )
}

/* CHECKBOX */
const checkboxNormalizer = (value, previousValue) => {
  if(typeof value === 'boolean') return
  const operation = value.split('-')
  const operationType = operation[0]
  const storeValue = operation[1]
  if(operationType === 'add') {
    return [...previousValue, storeValue]
  } else if (operationType === 'remove') {
    const newValue = previousValue.filter(v => v !== storeValue)
    return [...newValue]
  } else {
    return previousValue
  }
}

export const addCheckboxField = (BaseComponent) => ({ name, validationRules, ...props }) => {
  const validateRules = validator.createValidationRules(validationRules)
  return (
    <Field name={name} component={BaseComponent} validate={validateRules} {...props} normalize={checkboxNormalizer} />
  )
}

/* SELECT */
export const addSelectField = (BaseComponent) => ({ name, validationRules, placeholder, options, ...props }) => {
  const validateRules = validator.createValidationRules(validationRules)
  return (
    <Field name={name} component={BaseComponent} validate={validateRules} {...props} >
      <option value=''>{placeholder}</option>
      {options.map((option, key) => <option key={key} value={option.value}>{option.label}</option>)}
    </Field>
  )
}

/* FIELD ARRAY */
const renderChildren = ({ fields, BaseComponent, WrapperComponent }) => {
  return WrapperComponent ? (
    <WrapperComponent fields={fields}>
      {fields.map((form, index) => <BaseComponent key={index} index={index} fieldName={form} fields={fields} />)}
    </WrapperComponent>
  ) : (
    <div>
      {fields.map((form, index) => <BaseComponent key={index} index={index} fieldName={form} fields={fields} />)}
    </div>
  )
}

export const addFieldArray = (name, BaseComponent, WrapperComponent) => 
  <FieldArray name={name} BaseComponent={BaseComponent} WrapperComponent={WrapperComponent} component={renderChildren} />