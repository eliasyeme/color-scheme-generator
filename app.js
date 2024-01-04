const colorEl = document.getElementById('color')
const formEl = document.getElementById('form')
const optionsEl = document.getElementById('options')
const url = 'https://www.thecolorapi.com/scheme'
document.addEventListener('click',(e) =>  {
    if (e.target.id === 'submit') {
        e.preventDefault()
        handleSubmit()
    }else if (e.target.id === 'select-btn') {
        optionsEl.classList.toggle('hidden')
    }else if (e.target.checked) {
        const selectedEl = document.getElementById(e.target.id)
        document.getElementById('select-text').textContent = selectedEl.labels[0].textContent
        optionsEl.classList.toggle('hidden')

    }
})

function handleSubmit() {
    const hex = colorEl.value.slice(1)
    const mode = document.querySelector('input[type="radio"]:checked').id
    const count = 5
    console.log(hex, mode, count)

    fetch(`${url}?hex=${hex}&mode=${mode}&count=${count}`)
        .then(res => res.json())
        .then(data => {
            console.log(data)
            const colorsEl = document.getElementById('colors')
            colorsEl.innerHTML = ''
            data.colors.forEach(({hex}) => {
                const colorEl = document.createElement('div')
                colorEl.classList.add('color')
                colorEl.style.backgroundColor = hex.value
                colorEl.addEventListener('click', () => {
                    navigator.clipboard.writeText(hex.value)
                    const tooltip = document.getElementById('tooltip')
                    tooltip.classList.add('show')
                    setTimeout(() => {
                        tooltip.classList.remove('show')
                    }, 2000)
                })

                const hexEl = document.createElement('span')
                hexEl.textContent = hex.value
                hexEl.classList.add('hex')

                colorEl.appendChild(hexEl)
                colorsEl.appendChild(colorEl)
            });                
        })
}

handleSubmit()