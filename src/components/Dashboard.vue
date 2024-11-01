<template>
    <!-- div#burger-table -->
    <div id="burger-table">
        <Message :msg="msg" v-show="msg" />
        <div>
            <!-- #burger-table-heading -->
             <div id="burger-table-heading">
                <!-- div.order-id -->
                <div class="order-id">#:</div>
                <div>Cliente:</div>
                <div>Pão:</div>
                <div>Carne:</div>
                <div>Opcionais:</div>
                <div>Ações:</div>
             </div>
        </div>
        <!-- LINHAS DA TABELA -->
        <div id="burger-table-rows">
            <!-- .burger-table-row -->
            <div class="burger-table-row" v-for="burger in burgers" :key="burger.id">
                <!-- .order-number -->
                <div class="order-number">{{ burger.id }}</div>
                <div>{{ burger.nome }}</div>
                <div>{{ burger.pao}}</div>
                <div>{{ burger.carne}}</div>
                <div>
                    <ul>
                        <li v-for="(opcional, index) in burger.opcionais" :key="index">
                            {{ opcional }}
                        </li>  
                    </ul>
                </div>
                <div>
                    <select name="status" class="status" @change="updatedBurger($event, burger.id)">
                        <option value="">Selecione</option>
                        <option v-for="s in status" :key="s.id" :value="s.tipo" :selected="burger.status == s.tipo">
                            {{ s.tipo }}
                        </option>
                    </select>
                    <button class="delete-btn" @click="deleteBurger(burger.id)">Cancelar</button>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import Message from './Message.vue';

    export default {
        name: "Dashboard",
        data() {
            return {
                burgers: null,
                burger_id: null,
                status: [],
                msg: null
            }
        },
        components: {
            Message
        },
        methods: {
            async getPedidos() {

                //REQUISIÇÃO DO BACKEND
                const req = await fetch("http://localhost:3000/burgers");

                //TRANSFORMANDO A REQUISIÇÃO EM JSON
                const data = await req.json();

                //TROCANDO O VALOR DE NULL PELO DADO QUE VEIO DA REQUISIÇÃO
                this.burgers = data;

                //RESGATAR STATUS
                this.getStatus();
            },
            async getStatus() {
                const req = await fetch("http://localhost:3000/status");

                const data = await req.json();

                this.status = data;

            },
            async deleteBurger(id) {

                const req = await fetch(`http://localhost:3000/burgers/${id}`, {
                    method: "DELETE"
                });

                const res = await req.json();

                //MENSAGEM DE SISTEMA DE QUE  FOI DELETADO
                this.msg =  `Pedido removido com sucesso!`;

                //LIMPAR MENSAGEM
                setTimeout(() => this.msg = "", 3000);

                this.getPedidos();

            },
            async updatedBurger(event, id) {
                
                const option = event.target.value; //PARA SABER QUAL O STATUS QUE O USUÁRIO ADMIN. ESTÁ COLOCANDO 

                const dataJson = JSON.stringify({ status: option }); //COLOCANDO EM STRINGS O JSON STATUS NO BANCO

                //REQUISIÇÃO
                const req = await fetch(`http://localhost:3000/burgers/${id}`, {
                    method: "PATCH", //ATUALIZAÇÃO DO STATUS
                    headers: { "Content-Type": "application/json" },
                    body: dataJson
                });

                const res = await req.json(); //RESPOSTA

                //MENSAGEM DE SISTEMA DE QUE O STATUS DO PEDIDO FOI ATUALIZADO
                this.msg =  `O pedido Nº ${res.id} foi atualizado para ${res.status}!`;

                //LIMPAR MENSAGEM
                setTimeout(() => this.msg = "", 3000);

                console.log(res);

            }
        },
        //APÓS MONTADO, OBTER O PEDIDO
        mounted() {
            this.getPedidos(); 
        }
    }
</script>

<style scoped>
    #burger-table {
        max-width: 1200px;
        margin: 0 auto;
    }

    #burger-table-heading,
    #burger-table-rows,
    .burger-table-row {
        display: flex;
        flex-wrap: wrap;
    }
    
    #burger-table-heading {
        font-weight: bold;
        width: 100%;
        padding: 12px;
        border-bottom: 3px solid #333;
        text-align: center;
    }

    #burger-table-heading div{
        width: 16%;
    }

    .burger-table-row div {
        flex: 1;
        display: flex;
        align-items: center;
        justify-content: center;
        padding: 12px;
    }

    .burger-table-row {
        width: 100%;
        text-align: center;
        padding: 12px;
        border-bottom: 1px solid #ccc;
    }

    #border-table-heading .order-id,
    .burger-table-row .order-number {
        width: 5%;
    }

    select {
        padding: 12px 6px;
        margin-right: 12px;
    }

    .delete-btn {
        background-color: #222;
        color: #FCBA03;
        font-weight: bold;
        border: 2px solid #222;
        padding: 10px;
        font-size: 16px;
        margin: 0 auto;
        cursor: pointer;
        transition: .5s;
    }

    .delete-btn:hover {
        background-color: transparent;
        color: #222;
    }
</style>