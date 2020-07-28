class Queue_len {
    constructor(length){
        this.maxLength = length
        this.data = []
        this.index = -1
    }

    push(items, isArray=true){
        if (this.index > 80000){
            this.index = this.maxLength
        }
        if (isArray){
            for (let i=0; i < items.length; i++ ){
                this.data.push(items[i])
                this.index += 1
                if (this.index >= this.maxLength){
                    this.data = this.data.slice(-this.maxLength)
                }
            }
        }
        else {
            this.data.push(items)
            this.index += 1
            if (this.index >= this.maxLength){
                this.data = this.data.slice(-this.maxLength)
            }
        }
    }
}

export default Queue_len