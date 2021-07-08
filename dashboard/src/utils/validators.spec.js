import {
    validateEmptyAndEmail,
    validateEmptyAndLength3,
    validateEmptyAndName
} from './validators'

describe('Validators utils', () => {
  it('Deve apresentar erro se não tiver nenhum parâmetro na senha', () => {
    expect(validateEmptyAndLength3()).toBe('Campo obrigatório!')
  })
  it('Deve apresentar erro se não tiver a quantidade total de caracteres', () => {
    expect(validateEmptyAndLength3('12')).toBe('Senha inválida, o campo espera receber no mínimo 3 caracteres!')
  })
  it('Deve retornar verdadeiro quando passado um parâmetro válido', () => {
    expect(validateEmptyAndLength3('1234')).toBe(true)
  })
  it('Deve apresentar erro se não tiver nenhum parâmetro no email', () => {
    expect(validateEmptyAndEmail()).toBe('Campo obrigatório!')
  })
  it('Deve apresentar erro se não for válido o email', () => {
    expect(validateEmptyAndEmail('gustavo.com')).toBe('Email inválido, digite um e-mail válido!')
  })
  it('Deve retornar verdadeiro se for válido o email', () => {
    expect(validateEmptyAndEmail('gustavo@gmail.com')).toBe(true)
  })
  it('Deve apresentar erro se não tiver nenhum parâmetro no nome', () => {
    expect(validateEmptyAndName()).toBe('Campo obrigatório!')
  })
  it('Deve apresentar erro se não for válido o parâmetro no nome', () => {
    expect(validateEmptyAndName('Gugu')).toBe('Nome inválido, campo espera receber no mínimo 7 caracteres!')
  })
  it('Deve retornar verdadeiro se tiver o nome válido', () => {
    expect(validateEmptyAndName('Gustavo Melo')).toBe(true)
  })
})
