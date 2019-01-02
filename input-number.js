function isValueNumber(value) {
    return !isNaN(value);
};
Vue.component('number-input', {
    template: `<div class="number-input">
        <input type="text"
        :value="currentValue"
        @change="handleChange">
        <button @click="handleDown" :disable="currentValue <= min">-</button> 
        <button @click="handleUp" :disable="currentValue >= max">+</button>
        </div>`,
    props: {
        max: {
            type: Number,
            default: Infinity
        },
        min: {
            type: Number,
            default: -Infinity
        },
        value: {
            type: Number,
            default: 0
        }
    },
    data() {
        return {
            currentValue: this.value
        }
    },
    watch: {
        currentValue: function (val) {
            this.$emit('input', val);
            this.$emit('on-change', val);
            console.log(`watch currentValue ${val}`);
        },
        value: function (val) {
            this.updateValue(val);
            console.log(`watch value ${val}`);
        }
    },
    methods: {
        handleUp: function () {
            if (this.currentValue >= this.max) return;
            this.currentValue += 1;
        },
        handleDown: function () {
            if (this.currentValue <= this.min) return;
            this.currentValue -= 1;
        },
        handleChange: function (event) {
            let val = event.target.value.trim();
            if (isValueNumber(val)) {
                val = Number(val);
                if (val > this.max) val = this.max;
                if (val < this.min) val = this.min;
                this.currentValue = val;
            } else {
                event.target.value = this.currentValue;
            }
        },
        updateValue: function (val) {
            if (val > this.max) val = this.max;
            if (val < this.min) val = this.min;
            this.currentValue = val;
        }
    },
    mounted() {
        this.updateValue(this.value);
    },
});