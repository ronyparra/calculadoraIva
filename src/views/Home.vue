<template>
  <div>
    <v-container>
      <v-form ref="form">
        <v-row class="text-center" dense>
          <v-col cols="7">
            <v-text-field
              label="Precio"
              :rules="rules"
              type="number"
              v-model="precio"
              autocomplete="off"
            ></v-text-field>
          </v-col>
          <v-spacer></v-spacer>
          <v-btn color="primary" class="mt-4" text outlined  @click="calcular()">CALCULAR</v-btn>
          
          <v-col cols="12">
            <v-data-table
              mobile-breakpoint="0"
              :headers="headers"
              :items="tabla"
              dense
              hide-default-footer
              :items-per-page="5"
              class="elevation-1"
            ></v-data-table>
          </v-col>
          <v-col cols="6">
            <v-text-field label="Iva 10" outlined readonly dense v-model="iva"></v-text-field>
          </v-col>
          <v-col cols="6">
            <v-text-field label="Total" outlined readonly dense v-model="total"></v-text-field>
          </v-col>
          <v-btn color="red" block outlined @click="cancelar()">Borrar</v-btn>
        </v-row>
      </v-form>
    </v-container>
    <v-footer absolute  padless>
      <v-card-text class="py-2 text-center">
        &copy; Powered by
        <strong>Rony Parra</strong>
      </v-card-text>
    </v-footer>
  </div>
</template>

<script>
export default {
  data() {
    return {
      precio: "",
      iva: "",
      total: "",
      rules: [
        (v) => !!v || "Este campo no puede estar vacio",
        (v) => {
          if (!isNaN(v)) return true;
          return "Este campo es numerico";
        },
        (v) => {
          if (v > 0) return true;
          return "Ingrese un numero mayor a 0";
        },
      ],
      headers: [
        {
          text: "Precio Unitario",
          sortable: false,

          value: "precio",
        },
        {
          text: "Exenta",
          sortable: false,
          align: 'right',
          value: "exenta",
        },
        {
          text: "5%",
          sortable: false,
          align: 'right',
          value: "iva5",
        },
        {
          text: "10%",
          sortable: false,
          align: 'right',
          value: "gravado",
        },
      ],
      tabla: [
        {
          precio: "",
          exenta: "",
          iva5: "",
          gravado: "",
        },
      ],
      default: {
        precio: "",
        exenta: "",
        iva5: "",
        gravado: "",
      },
    };
  },
  methods: {
    calcular() {
      if (!this.$refs.form.validate()) return null;
      let iva = Number(this.precio) / 21;
      let exenta = (Number(this.precio) - Number(iva)) / 2;
      let gravado = Number(this.precio) - Number(exenta);

      let tabla = {
        precio: this.toCurrency(Number(this.precio)),
        exenta: this.toCurrency(exenta),
        iva5: 0,
        gravado: this.toCurrency(gravado),
      };
      this.tabla = JSON.parse(JSON.stringify([tabla]));
      let i = 0;
      while (i < 2) {
        this.tabla.push(this.default);
        i++;
      }
      tabla.precio = "";
      this.tabla.push(tabla);
      this.iva = this.toCurrency(iva);
      this.total = this.toCurrency(Number(this.precio));
    },
    cancelar() {
      this.precio = "";
      this.iva = "";
      this.total = "";
      this.tabla = [];
      this.$refs.form.resetValidation();
    },
    toCurrency(value) {
      return new Intl.NumberFormat().format(value.toFixed(2));
    },
  },
};
</script>
