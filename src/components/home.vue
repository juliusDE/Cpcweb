<script>
import jsPDF from "jspdf";

export default {
  name: "HomeView",
  data() {
    return {
      table: {
        loading: false,
        search: "",
        items: [],
      },
      formModel: {
        show: false,
        view: 0,
        data: {
          //client
          id: "",
          name: "",
          lastname1: "",
          lastname2: "",
          mail: "",
          address: "",
          //general form
          map: "R",
          quotation: "A",
          extra: 0,
          detail: "",
          //areas and type zone
          cant: 1,
          area: 0,
          area1: 0,
          area2: 0,
          area3: 0,
          area4: 0,
          area5: 0,
          zone: "A",
        },
      },
    };
  },
  mounted() {
    this.getData();
  },
  methods: {
    getData() {
      this.table.items = [
        {
          key: "0",
          //client
          id: "",
          name: "",
          lastname1: "",
          lastname2: "",
          mail: "",
          address: "",
          //general form
          map: "R",
          quotation: "A",
          extra: 1,
          detail: "",
          //areas and type zone
          cant: 1,
          area: 10,
          area1: 1,
          area2: 1,
          area3: 1,
          area4: 1,
          area5: 1,
          zone: "A",
          est: "pendiente",
        },
        {
          key: "1",
          //client
          id: "",
          name: "",
          lastname1: "",
          lastname2: "",
          mail: "",
          address: "",
          //general form
          map: "R",
          quotation: "A",
          extra: 0,
          detail: "",
          //areas and type zone
          cant: 1,
          area: 0,
          area1: 0,
          area2: 0,
          area3: 0,
          area4: 0,
          area5: 0,
          zone: "A",
          est: "pendiente",
        },
        {
          key: "2",
          //client
          id: "",
          name: "",
          lastname1: "",
          lastname2: "",
          mail: "",
          address: "",
          //general form
          map: "R",
          quotation: "A",
          extra: 0,
          detail: "",
          //areas and type zone
          cant: 1,
          area: 0,
          area1: 0,
          area2: 0,
          area3: 0,
          area4: 0,
          area5: 0,
          zone: "A",
          est: "pendiente",
        },
        {
          key: "3",
          //client
          id: "",
          name: "",
          lastname1: "",
          lastname2: "",
          mail: "",
          address: "",
          //general form
          map: "R",
          quotation: "A",
          extra: 0,
          detail: "",
          //areas and type zone
          cant: 1,
          area: 0,
          area1: 0,
          area2: 0,
          area3: 0,
          area4: 0,
          area5: 0,
          zone: "A",
          est: "pendiente",
        },
        {
          key: "4",
          //client
          id: "",
          name: "",
          lastname1: "",
          lastname2: "",
          mail: "",
          address: "",
          //general form
          map: "U",
          quotation: "A",
          extra: 0,
          detail: "",
          //areas and type zone
          cant: 1,
          area: 400,
          area1: 0,
          area2: 0,
          area3: 0,
          area4: 0,
          area5: 0,
          zone: "A",
          est: "pendiente",
        },
      ];
    },
    openform() {
      this.formModel.view = 0;
      this.formModel.data = this.$options.data().formModel.data;
      this.formModel.show = true;
    },
    validClient() {
      if (this.$refs.client.validate()) {
        this.formModel.view++;
      }
    },
    validData() {
      if (this.$refs.data.validate()) {
        let newData = {
          ...this.formModel.data,
          key: this.table.items.length,
          est: "pendiente",
        };
        this.table.items.push(newData);
        this.formModel.show = false;
      }
    },
    actionsOptions(cmd, item) {
      switch (cmd) {
        case "opc1":
          item.est = "Aprobado";
          break;
        case "opc2":
          item.est = "Rechazado";
          break;
        case "opc3":
          this.crearPdf(item);
          break;
      }
    },
    crearPdf(item) {
      let areaAux = 0;
      if (item.quotation === "A" || item.quotation === "F") {
        areaAux = item.area;
      } else {
        areaAux =
          item.area1 + item.area2 + item.area3 + item.area4 + item.area5;
      }
      const doc = new jsPDF();
      doc.setFontSize(22);
      doc.text("Topografia Zumbado.", 20, 30);
      doc.setFontSize(14);
      doc.text("Dirección: San Joaquín, Flores, Heredia", 20, 40);
      doc.text("Teléfono: 2265-4748", 20, 45);
      doc.text("Email: topografiazumbado@hotmail.com", 20, 50);
      doc.setFontSize(12);
      doc.text("Estimado " + item.name + ",", 20, 65);
      doc.text(
        "Respecto a los honorarios, el plano de " +
          this.texto(item.quotation) +
          " tendría un total de " +
          areaAux +
          " metros",
        20,
        75
      );
      doc.text(
        "cuadrados, con lo cual el trabajo completo para la realización del levantamiento topográfico",
        20,
        80
      );
      doc.text(
        "y del plano tendría un costo de " +
          this.cotizar(item).toLocaleString("es-ES", {
            minimumFractionDigits: 3,
            maximumFractionDigits: 3,
          }) +
          " colones, contemplando los timbres y el IVA del",
        20,
        85
      );
      doc.text(
        "13%. En caso de aceptar este seria el valor que se incluirá en el cotrato oficial.",
        20,
        90
      );
      doc.text("Atentamente,", 20, 160);
      doc.text("Topografia Zumbado.", 20, 165);
      doc.save("carta.pdf");
    },
    cotizar(item) {
      if (item.quotation === "A" || item.quotation === "F") {
        let rango = this.range(item.area, item.map, item.zone);
        return rango + item.extra;
      } else {
        let areaAux =
          item.area1 + item.area2 + item.area3 + item.area4 + item.area5;
        let rango = this.range(areaAux, item.map, item.zone);
        return rango + item.extra;
      }
    },
    range(area, type, zona) {
      if (type === "R") {
        if (area >= 0.0401 && area <= 0.15) {
          return (11600 + 8370 * 33.426) * 1.13;
        } else if (area >= 0.1501 && area <= 0.5) {
          return (16600 + 8370 * 33.426) * 1.13;
        } else if (area >= 0.5001 && area <= 1) {
          return (21600 + 8370 * 33.426) * 1.13;
        } else if (area >= 1.0001 && area <= 2) {
          return (31600 + 8370 * 33.426) * 1.13;
        } else if (area >= 2.0001) {
          return (51600 + 6000 * 33.426 * Math.sqrt(area)) * 1.13;
        }
      } else {
        if (area >= 0 && area <= 400) {
          return (
            (this.zona(zona) * area + 160 * 33.426 * Math.sqrt(area) + 6600) *
            1.13
          );
        } else if (area >= 401 && area <= 1500) {
          return (
            (this.zona(zona) * area + 160 * 33.426 * Math.sqrt(area) + 11600) *
            1.13
          );
        } else if (area >= 1501 && area <= 5000) {
          return (
            (this.zona(zona) * area + 160 * 33.426 * Math.sqrt(area) + 16600) *
            1.13
          );
        } else if (area >= 5001 && area <= 10000) {
          return (
            (this.zona(zona) * area + 160 * 33.426 * Math.sqrt(area) + 21600) *
            1.13
          );
        } else if (area >= 10001 && area <= 20000) {
          return (
            (this.zona(zona) * area + 160 * 33.426 * Math.sqrt(area) + 31600) *
            1.13
          );
        } else if (area >= 20001) {
          return (
            (this.zona(zona) * area + 160 * 33.426 * Math.sqrt(area) + 51600) *
            1.13
          );
        }
      }
    },
    zona(zona) {
      switch (zona) {
        case "A":
          return 12.5 * 33.46;
          break;
        case "B":
          return 9 * 33.46;
          break;
        case "C":
          return 5.6 * 33.46;
          break;
        case "D":
          return 2.8 * 33.46;
          break;
        case "E":
          return 2 * 33.46;
          break;
        case "F":
          return 0.7 * 33.46;
          break;
      }
    },
    texto(id) {
      switch (id) {
        case "A":
          return "Rectificación de área";
          break;
        case "S":
          return "Segregación";
          break;
        case "F":
          return "Reunión de fincas";
          break;
        case "L":
          return "Localización de derechos";
          break;
      }
    },
  },
  computed: {
    option() {
      return [
        {
          text: "Cambiar a aprobado",
          cmd: "opc1",
        },
        {
          text: "Cambiar a rechazado",
          cmd: "opc2",
        },
        {
          text: "Pdf",
          cmd: "opc3",
        },
      ];
    },
    itemsTable() {
      return this.table.items.map((e) => {
        return {
          ...e,
          text: e.name + " " + e.lastname1 + " / " + e.address,
        };
      });
    },
    showForm() {
      return {
        AF:
          this.formModel.data.quotation === "A" ||
          this.formModel.data.quotation === "F",
        SL:
          this.formModel.data.quotation === "S" ||
          this.formModel.data.quotation === "L",
      };
    },
    selectItems() {
      return {
        map: [
          { text: "Rural", value: "R" },
          { text: "Urbano", value: "U" },
        ],
        quotation: [
          { text: "Rectificación de área", value: "A" },
          { text: "Segregación", value: "S" },
          { text: "Reunión de fincas", value: "F" },
          { text: "Localización de derechos", value: "L" },
        ],
        zone: ["A"],
        cant: [1, 2, 3, 4, 5],
      };
    },
    headers() {
      return [
        {
          text: "Descripción",
          value: "text",
        },
        {
          text: "Estado",
          value: "est",
        },
        {
          text: "Opciones",
          value: "actions",
          sortable: false,
          align: "center",
        },
      ];
    },
    blanksInput() {
      return [(value) => !!value || "Campo obligatorio"];
    },
  },
};
</script>
<template>
  <v-container>
    <v-card>
      <v-card-tittle>
        <v-row>
          <v-col>
            <v-btn class="mx-3" fab dark color="indigo" @click="openform()">
              <v-icon dark> mdi-plus </v-icon>
            </v-btn>
          </v-col>
          <v-col>
            <v-text-field
              class="mx-3"
              v-model="table.search"
              label="Buscar"
              append-icon="mdi-magnify"
              single-line
            ></v-text-field>
          </v-col>
        </v-row>
      </v-card-tittle>
      <v-card-text>
        <v-data-table
          :headers="headers"
          :search="table.search"
          :items.sync="itemsTable"
          :loading="table.loading"
          :loading-text="'Cargando'"
        >
          <template v-slot:item.actions="{ item }">
            <v-menu offset-y>
              <template v-slot:activator="{ on, attrs }">
                <v-icon :attrs="attrs" v-on="on"> mdi-menu </v-icon>
              </template>
              <v-list>
                <template v-for="(option, i) in option">
                  <v-list-item
                    :key="i"
                    @click="actionsOptions(option.cmd, item)"
                    >{{ option.text }}</v-list-item
                  >
                </template>
              </v-list>
            </v-menu>
          </template>
        </v-data-table>
      </v-card-text>
    </v-card>
    <v-dialog v-model="formModel.show" fullscreen>
      <v-card>
        <v-card-tittle class="dialog-tittle">
          <v-toolbar dark color="primary">
            <v-toolbar-title>prueba</v-toolbar-title>
            <v-spacer></v-spacer>
            <v-btn icon dark @click="formModel.show = false">
              <v-icon>mdi-close</v-icon>
            </v-btn>
          </v-toolbar>
        </v-card-tittle>
        <v-card-text class="scroll-y">
          <br />
          <v-tabs-items v-model="formModel.view">
            <!--client data-->
            <v-tab-item key="0">
              <v-form @submit.prevent="validClient()" ref="client">
                <v-row dense>
                  <v-col class="d-flex justify-content-center">
                    <label class="font-weight-bold">Datos del cliente.</label>
                  </v-col>
                </v-row>
                <!--id & name-->
                <v-row>
                  <!--ID-->
                  <v-col class="d-flex align-items-center">
                    <v-text-field
                      v-model="formModel.data.id"
                      counter="10"
                      maxlength="10"
                      label="Cédula"
                      required
                      :rules="blanksInput"
                    ></v-text-field>
                  </v-col>
                  <!--Name-->
                  <v-col class="d-flex align-items-center">
                    <v-text-field
                      v-model="formModel.data.name"
                      counter="10"
                      maxlength="10"
                      label="Nombre"
                      required
                      :rules="blanksInput"
                    ></v-text-field>
                  </v-col>
                </v-row>
                <!--last names-->
                <v-row>
                  <!--last name 1-->
                  <v-col class="d-flex align-items-center">
                    <v-text-field
                      v-model="formModel.data.lastname1"
                      counter="10"
                      maxlength="10"
                      label="Apellido 1"
                      required
                    ></v-text-field>
                  </v-col>
                  <!--last name 2-->
                  <v-col class="d-flex align-items-center">
                    <v-text-field
                      v-model="formModel.data.lastname2"
                      counter="10"
                      maxlength="10"
                      label="Apellido 2"
                      required
                    ></v-text-field>
                  </v-col>
                </v-row>
                <!--mail & address-->
                <v-row>
                  <!--mail-->
                  <v-col class="d-flex align-items-center">
                    <v-text-field
                      v-model="formModel.data.mail"
                      label="Email:"
                      required
                      type="email"
                      :rules="blanksInput"
                    ></v-text-field>
                  </v-col>
                  <!--address-->
                  <v-col class="d-flex align-items-center">
                    <v-text-field
                      v-model="formModel.data.address"
                      counter="60"
                      maxlength="60"
                      label="Dirección:"
                      required
                      :rules="blanksInput"
                    ></v-text-field>
                  </v-col>
                </v-row>
                <!--buttons-->
                <v-row>
                  <v-col class="d-flex justify-content-end">
                    <v-btn class="mx-3" dark color="indigo" type="submit">
                      Siguiente
                    </v-btn>
                  </v-col>
                </v-row>
              </v-form>
            </v-tab-item>
            <!--form data-->
            <v-tab-item key="1">
              <v-form @submit.prevent="validData()" ref="data">
                <!--subtittle-->
                <v-row dense>
                  <v-col class="d-flex justify-content-center">
                    <label class="font-weight-bold">
                      Seleccionar tipo de cotización.
                    </label>
                  </v-col>
                </v-row>
                <!--Types-->
                <v-row>
                  <v-col>
                    <v-select
                      label="Tipo de plano"
                      v-model="formModel.data.map"
                      :items="selectItems.map"
                      required
                      :rules="blanksInput"
                    ></v-select>
                  </v-col>
                  <v-col>
                    <v-select
                      label="Tipo de cotización"
                      v-model="formModel.data.quotation"
                      :items="selectItems.quotation"
                      required
                      :rules="blanksInput"
                    ></v-select>
                  </v-col>
                </v-row>
                <!--S|L-->
                <v-template v-if="showForm.SL">
                  <v-row>
                    <!--Area list-->
                    <v-col>
                      <v-row>
                        <v-col
                          class="d-flex align-items-center"
                          v-if="formModel.data.cant >= 1"
                        >
                          <v-text-field
                            v-model="formModel.data.area1"
                            label="Área 1."
                            type="number"
                            min="1"
                            required
                            :rules="blanksInput"
                          ></v-text-field>
                        </v-col>
                      </v-row>
                      <v-row>
                        <v-col
                          class="d-flex align-items-center"
                          v-if="formModel.data.cant >= 2"
                        >
                          <v-text-field
                            v-model="formModel.data.area2"
                            label="Área 2."
                            type="number"
                            required
                            :rules="blanksInput"
                          ></v-text-field>
                        </v-col>
                      </v-row>
                      <v-row>
                        <v-col
                          class="d-flex align-items-center"
                          v-if="formModel.data.cant >= 3"
                        >
                          <v-text-field
                            v-model="formModel.data.area3"
                            label="Área 3."
                            type="number"
                            required
                            :rules="blanksInput"
                          ></v-text-field>
                        </v-col>
                      </v-row>
                      <v-row>
                        <v-col
                          class="d-flex align-items-center"
                          v-if="formModel.data.cant >= 4"
                        >
                          <v-text-field
                            v-model="formModel.data.area4"
                            label="Área 4."
                            type="number"
                            required
                            :rules="blanksInput"
                          ></v-text-field>
                        </v-col>
                      </v-row>
                      <v-row>
                        <v-col
                          class="d-flex align-items-center"
                          v-if="formModel.data.cant >= 5"
                        >
                          <v-text-field
                            v-model="formModel.data.area5"
                            label="Área 5."
                            type="number"
                            required
                            :rules="blanksInput"
                          ></v-text-field>
                        </v-col>
                      </v-row>
                    </v-col>
                    <!--options-->
                    <v-col>
                      <v-row>
                        <v-select
                          label="Cantidad de áreas."
                          v-model="formModel.data.cant"
                          :items="selectItems.cant"
                          required
                          :rules="blanksInput"
                        ></v-select>
                      </v-row>
                      <v-row>
                        <v-col class="d-flex align-items-center">
                          <v-select
                            label="Tipo de incremento por zona."
                            v-model="formModel.data.zone"
                            :items="selectItems.zone"
                            required
                            :rules="blanksInput"
                          ></v-select>
                        </v-col>
                      </v-row>
                    </v-col>
                  </v-row>
                </v-template>
                <!--A|F-->
                <v-template v-if="showForm.AF">
                  <v-row>
                    <!--area-->
                    <v-col class="d-flex align-items-center">
                      <v-text-field
                        v-model="formModel.data.area"
                        label="Área."
                        type="number"
                        min="1"
                        required
                        :rules="blanksInput"
                      ></v-text-field>
                    </v-col>
                    <!--zone-->
                    <v-col class="d-flex align-items-center">
                      <v-select
                        label="Tipo de incremento por zona."
                        v-model="formModel.data.zone"
                        :items="selectItems.zone"
                        required
                        :rules="blanksInput"
                      ></v-select>
                    </v-col>
                  </v-row>
                </v-template>
                <!--extra & detail-->
                <v-row>
                  <!--extra-->
                  <v-col class="d-flex align-items-center">
                    <v-text-field
                      v-model="formModel.data.extra"
                      label="Cargos extra."
                      type="number"
                      required
                      :rules="blanksInput"
                    ></v-text-field>
                  </v-col>
                  <!--detail-->
                  <v-col class="d-flex align-items-center">
                    <v-text-field
                      v-model="formModel.data.detail"
                      label="Observaciones."
                      :rules="blanksInput"
                    ></v-text-field>
                  </v-col>
                </v-row>
                <!--buttons-->
                <v-row>
                  <v-col class="d-flex justify-content-start">
                    <v-btn
                      class="mx-3"
                      dark
                      color="indigo"
                      @click="formModel.view -= 1"
                    >
                      Volver
                    </v-btn>
                  </v-col>
                  <v-col class="d-flex justify-content-end">
                    <v-btn class="mx-3" dark color="indigo" type="submit">
                      Finalizar
                    </v-btn>
                  </v-col>
                </v-row>
              </v-form>
            </v-tab-item>
          </v-tabs-items>
        </v-card-text>
      </v-card>
    </v-dialog>
  </v-container>
</template>
