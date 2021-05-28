export function validateEmptyAndLength3 (value) {
  if (!value) {
    return 'Campo obrigatório!'
  }
  if (value.length < 3) {
    return 'Senha inválida, o campo espera receber no mínimo 3 caracteres!'
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

export function validateEmptyAndName (value) {
  if (!value) {
    return 'Campo obrigatório!'
  }
  if (value.length < 7) {
    return 'Nome inválido, campo espera receber no mínimo 7 caracteres!'
  }

  return true
}
