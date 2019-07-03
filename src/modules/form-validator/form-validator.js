import * as validator from 'redux-form-validators'

/* Utils */
import { cleanString } from '../helpers/stringUtils'

/* Default messages */
validator.default.messages = {
  ...validator.default.messages,
  presence: 'Preenchimento obrigatório',
  email: 'Endereço de e-mail inválido',
  dateFormat: 'Formato de data inválido',
  dateInvalid: 'Informe uma data válida'
}

/* Custom validators */
validator.cpf = validator.addValidator({
  defaultMessage: 'Informe um CPF válido',
  validator: (options, value) => {
    const pattern = /^[0-9]{3}\.[0-9]{3}\.[0-9]{3}\-[0-9]{2}$/gi
    if (!pattern.test(value)) return false
    return validateCPF(value)
  }
})

validator.cnpj = validator.addValidator({
  defaultMessage: 'Informe um CNPJ válido',
  validator: (options, value) => {
    const pattern = /^[0-9]{2}\.[0-9]{3}\.[0-9]{3}\/[0-9]{4}\-[0-9]{2}$/gi
    if (!pattern.test(value)) return false
    return validateCNPJ(value)
  }
})

validator.cpf_cnpj = validator.addValidator({
  defaultMessage: 'Informe um CPF ou CNPJ válido',
  validator: (options, value) => {
    const cleanValue = cleanString(value)
    if (cleanValue.length === 11) {
      const pattern = /^[0-9]{3}\.[0-9]{3}\.[0-9]{3}\-[0-9]{2}$/gi
      if (!pattern.test(value)) return false
      return validateCPF(value)
    } else if (cleanValue.length === 14) {
      const pattern = /^[0-9]{2}\.[0-9]{3}\.[0-9]{3}\/[0-9]{4}\-[0-9]{2}$/gi
      if (!pattern.test(value)) return false
      return validateCNPJ(value)
    }
    return false
  }
})

validator.name = validator.addValidator({
  defaultMessage: 'Informe um nome válido',
  validator: (options = { required: true }, value) => {
    let isValid = true
    if (options.required) {
      isValid = isValid && !!value
    }
    if (!!value) {
      const pattern = /^[a-z\u00c0-\u017e]+[\ ][a-z\u00c0-\u017e]+([a-z\u00c0-\u017e\ ]+)?$/gi
      isValid = isValid && pattern.test(value)
    }
    return isValid
  }
})

validator.money = validator.addValidator({
  defaultMessage: 'Informe um valor no padrão R$ 0,00',
  validator: (options = { required: true, allow_zero: true }, value) => {
    let isValid = true
    if (options.required) {
      isValid = isValid && !!value
    }
    if (options.min_value) {
      const intValue = parseInt(cleanString(value, ['r']))
      isValid = isValid && intValue >= options.min_value
      if (!isValid) {
        return {
          id: 'form.errors.money_min_value',
          defaultMessage: 'Valor mínino aceito é R$ { min_value, number },00',
          values: { min_value: (options.min_value/100) }
        }
      }
    }
    if (!!value) {
      const pattern = /^\R\$\ \d+(\.\d+)*?\,\d{2}$/gi
      isValid = isValid && pattern.test(value)
    }
    return isValid
  }
})

validator.checkbox = validator.addValidator({
  defaultMessage: 'Selecione pelo menos um item',
  validator: (options = { required: true }, value) => {
    let isValid = true
    if (options.required) {
      isValid = isValid && !!value.length
    }
    return isValid
  }
})

validator.cellphone = validator.addValidator({
  defaultMessage: 'Informe um celular válido',
  validator: (options = { required: true }, value) => {
    let isValid = true
    if (options.required) {
      isValid = isValid && !!value
    }
    if (!!value) {
      const pattern = /^\(\d{2}\)\ \9\d{4}\.\d{4}$/gi
      isValid = isValid && pattern.test(value)
    }
    return isValid
  }
})

validator.phone = validator.addValidator({
  defaultMessage: 'Informe um telefone válido',
  validator: (options = { required: true }, value) => {
    let isValid = true
    if (options.required) {
      isValid = isValid && !!value
    }
    if (!!value) {
      const pattern  = /^\(\d{2}\)\ [2-5]{1}[0-9]{3}\.\d{4}$/gi
      isValid = isValid && pattern.test(value)
    }
    return isValid
  }
})

validator.alpha = validator.addValidator({
  defaultMessage: 'Somente caracteres alfabéticos',
  validator: (options = { required: true }, value) => {
    let isValid = true
    if (options.required) {
      isValid = isValid && !!value
    }
    if (!!value) {
      const pattern = /[a-zA-Z\ \u00c0-\u017e]/gi
      isValid = isValid && pattern.test(value)
    }
    return isValid
  }
})

validator.number = validator.addValidator({
  defaultMessage: 'Somente caracteres numéricos',
  validator: (options = { required: true }, value) => {
    let isValid = true
    if (options.required) {
      isValid = isValid && !!value
    }
    if (options.min_value) {
      value = parseInt(value)
      isValid = isValid && value >= options.min_value
      if (!isValid) {
        return {
          id: 'form.errors.number_min_value',
          defaultMessage: 'Valor mínino aceito é { min_value, number }',
          values: { min_value: options.min_value }
        }
      }
    }
    if (options.max_value) {
      value = parseInt(value)
      isValid = isValid && value <= options.max_value
      if (!isValid) {
        return {
          id: 'form.errors.number_max_value',
          defaultMessage: 'Valor máximo aceito é { max_value, number }',
          values: { max_value: options.max_value }
        }
      }
    }
    if (!!value) {
      const pattern = /[0-9]/gi
      isValid = isValid && pattern.test(value)
    }
    return isValid
  }
})

validator.alpha_number = validator.addValidator({
  defaultMessage: 'Somente caracteres alfa-numéricos',
  validator: (options = { required: true }, value) => {
    let isValid = true
    if (options.required) {
      isValid = isValid && !!value
    }
    if (!!value) {
      const pattern = /[a-zA-Z0-9\ \u00c0-\u017e]/gi
      isValid = isValid && pattern.test(value)
    }
    return isValid
  }
})

validator.cep = validator.addValidator({
  defaultMessage: 'Informe um CEP válido',
  validator: (options = { required: true }, value) => {
    let isValid = true
    if (options.required) {
      isValid = isValid && !!value
    }
    if (!!value) {
      const pattern = /^\d{5}-\d{3}$/
      isValid = isValid && pattern.test(value)
    }
    return isValid
  }
})

/* Create a validation list */
const createValidationRules = (rules) => {
  const validateRules = Object.keys(rules).map(key => {
    if (!validator[key]) {
      throw `Redux-Form-Validator: validation rule '${key}' can't be found`
    }
    return validator[key](rules[key])
  })
  return validateRules
}

/* Validation methods */
const validateCPF = (cpf) => {
  const cleanCPF = cleanString(cpf)
  let soma = 0
  let resto = 0

  if (cleanCPF == "00000000000" || cleanCPF == "11111111111" || cleanCPF == "22222222222" ||
    cleanCPF == "33333333333" || cleanCPF == "44444444444" || cleanCPF == "55555555555" ||
    cleanCPF == "66666666666" || cleanCPF == "77777777777" || cleanCPF == "88888888888" ||
    cleanCPF == "99999999999") return false;

  for (let i = 1; i <= 9; i++) {
    soma = soma + parseInt(cleanCPF.substring(i - 1, i)) * (11 - i)
  }
  resto = (soma * 10) % 11

  if ((resto == 10) || (resto == 11)) {
    resto = 0
  }
  if (resto != parseInt(cleanCPF.substring(9, 10))) {
    return false
  }

  soma = 0
  for (let i = 1; i <= 10; i++) {
    soma = soma + parseInt(cleanCPF.substring(i - 1, i)) * (12 - i)
  }
  resto = (soma * 10) % 11

  if ((resto == 10) || (resto == 11)) {
    resto = 0
  }
  if (resto != parseInt(cleanCPF.substring(10, 11))) {
    return false
  }
  return true
}

const validateCNPJ = (cnpj) => {

  const cleanCNPJ = cleanString(cnpj)

  if (cleanCNPJ == "00000000000000" || cleanCNPJ == "11111111111111" || cleanCNPJ == "22222222222222" ||
    cleanCNPJ == "33333333333333" || cleanCNPJ == "44444444444444" || cleanCNPJ == "55555555555555" ||
    cleanCNPJ == "66666666666666" || cleanCNPJ == "77777777777777" || cleanCNPJ == "88888888888888" ||
    cleanCNPJ == "99999999999999") return false

  let tamanho = cleanCNPJ.length - 2
  let numeros = cleanCNPJ.substring(0, tamanho)
  let pos = tamanho - 7
  let soma = 0
  const digitos = cleanCNPJ.substring(tamanho)

  for (let i = tamanho; i >= 1; i--) {
    soma += numeros.charAt(tamanho - i) * pos--
    if (pos < 2) {
      pos = 9
    }
  }

  let resultado = soma % 11 < 2 ? 0 : 11 - soma % 11

  if (resultado != digitos.charAt(0)) {
    return false
  }

  tamanho = tamanho + 1
  numeros = cleanCNPJ.substring(0, tamanho)
  soma = 0
  pos = tamanho - 7

  for (let i = tamanho; i >= 1; i--) {
    soma += numeros.charAt(tamanho - i) * pos--
    if (pos < 2) {
      pos = 9
    }
  }

  resultado = soma % 11 < 2 ? 0 : 11 - soma % 11

  if (resultado != digitos.charAt(1)) {
    return false
  }
  return true
}

export default {
  createValidationRules
}