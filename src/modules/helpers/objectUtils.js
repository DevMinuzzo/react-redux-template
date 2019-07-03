/* 
 * FUNÇÃO PARA CLONAR UM OBJETO DEEP SEM GUARDAR
 * REFERÊNCIA DO OBJETO DE ORIGEM.
*/
export function cloneObject(object) {
    const clone = { ...object }
    Object.keys(clone).forEach(key => {
        if (clone[key] !== null && typeof clone[key] === 'object') {
            if (clone[key].length === undefined) {
                clone[key] = { ...cloneObject(clone[key]) }
            } else {
                clone[key] = clone[key].map(elem => {
                    if (typeof elem === 'object') {
                        return { ...cloneObject(elem) }
                    } else {
                        return elem
                    }
                })
            }
        }
    })
    return clone
}