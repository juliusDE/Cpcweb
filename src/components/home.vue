<script>
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
  methods: {
    openform() {
      this.formModel.show = true;
    },
  },
  computed: {
    itemsTable() {
      return this.table.items.map((e) => {
        return {
          ...e,
          text: e.des + " - " + e.cli,
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
          <template v-slot:item.actions="{}">
            <v-menu offset-y>
              <template v-slot:activator="{ on, attrs }">
                <v-icon :attrs="attrs" v-on="on"> mdi-menu </v-icon>
              </template>
              <v-list>
                <v-list-item>prueba</v-list-item>
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
          <v-form>
            <v-tabs-items v-model="formModel.view">
              <!--client data-->
              <v-tab-item key="0">
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
                    ></v-text-field>
                  </v-col>
                </v-row>
                <!--buttons-->
                <v-row>
                  <v-col class="d-flex justify-content-end">
                    <v-btn
                      class="mx-3"
                      dark
                      color="indigo"
                      @click="formModel.view += 1"
                    >
                      Siguiente
                    </v-btn>
                  </v-col>
                </v-row>
              </v-tab-item>
              <!--form data-->
              <v-tab-item key="1">
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
                    ></v-select>
                  </v-col>
                  <v-col>
                    <v-select
                      label="Tipo de cotización"
                      v-model="formModel.data.quotation"
                      :items="selectItems.quotation"
                      required
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
                            required
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
                        ></v-select>
                      </v-row>
                      <v-row>
                        <v-col class="d-flex align-items-center">
                          <v-select
                            label="Tipo de incremento por zona."
                            v-model="formModel.data.zone"
                            :items="selectItems.zone"
                            required
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
                        required
                      ></v-text-field>
                    </v-col>
                    <!--zone-->
                    <v-col class="d-flex align-items-center">
                      <v-select
                        label="Tipo de incremento por zona."
                        v-model="formModel.data.zone"
                        :items="selectItems.zone"
                        required
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
                    ></v-text-field>
                  </v-col>
                  <!--detail-->
                  <v-col class="d-flex align-items-center">
                    <v-text-field
                      v-model="formModel.data.detail"
                      label="Observaciones."
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
                    <v-btn class="mx-3" dark color="indigo"> Siguiente </v-btn>
                  </v-col>
                </v-row>
              </v-tab-item>
            </v-tabs-items>
          </v-form>
        </v-card-text>
      </v-card>
    </v-dialog>
  </v-container>
</template>
