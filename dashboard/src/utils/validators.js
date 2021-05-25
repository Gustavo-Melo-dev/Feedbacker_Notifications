export function validateEmptyAndLength5 (value) {
  if (!value) {
    return 'Campo obrigatório!'
  }
  if (value.length < 5) {
    return 'Senha inválida, o campo espera receber no mínimo 5 caracteres!'
  }

  return true
}

export function validateEmptyAndEmail (value) {
  if (!value) {
    return 'Campo obrigatório!'
  }
  const isValid = /^[a-z0-9.]+@[a-z0-9]+\.[a-z]+(\.[a-z]+)?$/i.test(value)

  if (!isValid) {
    return 'Email inválido, digite um e-mail válido!'
  }

  return true
}
