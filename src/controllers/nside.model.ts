import { Schema, model } from "mongoose";
// https://mongoosejs.com/docs/typescript.html
// https://mongoosejs.com/docs/validation.html

// ref: "onside" -> 1 oldali modell neve, nem kell átírni!

const nsideSchema = new Schema(
    {
        _id: Number,
        name: {
            type: String,
            required: true,
        },
        productname:{
            type: String,
            required: true,
        },
        picture:{
            type: String,
            required: true,
        },
        resolution: {
            type: String,
            required: true,
        },
        description: {
            type: String,
            required: true,
        },
        displaysize: {
            type: Number,
            required: true,
        },
        refreshrate: {
            type: Number,
            required: true,
        },
        responsetime: {
            type: Number,
            required: true,
        },
        type: {
            type: String,
            required: true,
        },
        price: {
            type: Number,
            required: true,
        },
        others: {
            type: Array,
            default: false,
        }
        // description: {
        //     type: String,
        //     required: true,
        // },
        // isGlutenFree: {
        //     type: Boolean,
        //     required: true,
        // },
        // prepTime: {
        //     type: Number,
        //     required: true,
        // },
        // minMaxExample: {
        //     type: Number,
        //     min: [1, "Too few stars, got {VALUE}"],
        //     max: [5, "Too many stars, got {VALUE}"],
        //     required: [true, "minMaxExample field is required"],
        // },
        // enumExample: {
        //     type: String,
        //     enum: {
        //         values: ["Coffee", "Tea"],
        //         message: "{VALUE} is not supported",
        //     },
        // },
        // customValidatorExample: {
        //     type: Number,
        //     validate: {
        //         validator: function (v: number) {
        //             return v % 2 == 0;
        //         },
        //         message: "Nem páros számot adott meg!",
        //     },
        // },
        // dateExample: {
        //     type: Date,
        //     default: new Date(),
        //     max: ["2100-12-31", "Csak 21. századi dátumot adhat meg!"],
        //     validate: {
        //         validator: function (v: Date) {
        //             return v >= new Date();
        //         },
        //         message: "Az aktuális dátumnál nem adhat meg korábbi dátumot!",
        //     },
        // },
    },
    { versionKey: false },
);

const nsideModel = model("nside", nsideSchema, "Monitor");

export default nsideModel;
