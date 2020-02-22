<template>
    <section>
        <hr>
        <b-pagination
                :total="total"
                :current.sync="current"
                :range-before="rangeBefore"
                :range-after="rangeAfter"
                :order="order"
                :size="size"
                :simple="isSimple"
                :rounded="isRounded"
                :per-page="perPage"
                :icon-prev="prevIcon"
                :icon-next="nextIcon"
                aria-next-label="След."
                aria-previous-label="Пред. страница"
                aria-page-label="Страница"
                aria-current-label="Сейчас"
                @change="current = $event"
                >
        </b-pagination>
    </section>
</template>

<script>
    export default {
        data() {
            return {
                rangeBefore: 2,
                rangeAfter: 2,
                order: '',
                size: '',
                isSimple: false,
                isRounded: false,
                prevIcon: 'chevron-left',
                nextIcon: 'chevron-right',
            }
        },
        props:{
            total: {type: Number, reqiered: true},
            currentPage: {type: Number, reqiered: true},
            perPage: {type: Number, reqiered: true},
        },
        computed:{
            current:{
                get(){return this.currentPage},
                set(val){this.$emit('change',val)}
            }
        }
    }
</script>