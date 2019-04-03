<template>
    <v-container>
        <v-layout row>
            <v-flex xs12>
                <v-text-field
                ref="ng"
                label="Media Type"
                color="white"
                v-model="value.title"
                @keyup.enter="addMediaType()"
                ></v-text-field>
            </v-flex>
        </v-layout>
        <v-layout row justify-end>
            <v-flex xs9 sm6 md6>
                <v-btn color="blue" @click="save()">Save</v-btn>
                <v-btn color="red" @click="cancel()">Cancel</v-btn>
            </v-flex>
        </v-layout>
    </v-container>
</template>

<script>
    export default {
        props: ['value', 'dialog'],
        watch: {
            dialog(newVal,oldVal) {
                if(newVal === true && this.value.title === '') {
                    const input = this.$refs.ng.$el.querySelector('input');
                    input.focus();
                }
            }
        },
        methods: {
            save() {
               this.$emit('updated', this.value);
            },
            cancel() {
                this.$emit('cancelled');
            }
        }
    };
</script>

<style scoped>

</style>