import { Request, Response, Router } from "express";
import Controller from "../interfaces/controller.interface";
import nsideModel from "./nside.model";


export default class nsideController implements Controller {
    public path = "/api/xyz";
    public router = Router();
    private nsideM = nsideModel;

    constructor() {
        this.router.get("/", (req: Request, res: Response) => {
            res.send("Working!");
        });
        
        this.router.get("/api/monitors", this.getAll);
        this.router.get("/api/pagination/:offset/:limit/:order/:sort/:keyword?", this.getPag);
        this.router.get("/api/monitor/:id", this.getById);

        this.router.post("/api/new", this.create);
        
        this.router.put("/api/monitor/:id", this.modifyPUT);

        this.router.delete("/api/monitors/:id", this.delete);


    }



    private getAll = async (req: Request, res: Response) => {
        try {
            const data = await this.nsideM.find();
            res.send(data);
        } catch (error) {
            res.status(400).send(error.message);
        }
    };

    private getPag = async (req: Request, res: Response) => {
        try {
            const offset = parseInt(req.params.offset);
            const limit = parseInt(req.params.limit);
            const order = req.params.order;
            const sort = parseInt(req.params.sort); // desc: -1  asc: 1
            let monitors = [];
            let count = 0;
            if (req.params.keyword) {
                const regex = new RegExp(req.params.keyword, "i"); // i for case insensitive
                count = await this.nsideM.find({ $or: [{ title: { $regex: regex } }, { content: { $regex: regex } }] }).count();
                monitors = await this.nsideM
                    .find({ $or: [{ title: { $regex: regex } }, { content: { $regex: regex } }] })
                    .sort(`${sort == -1 ? "-" : ""}${order}`)
                    .skip(offset)
                    .limit(limit);
            } else {
                count = await this.nsideM.countDocuments();
                monitors = await this.nsideM
                    .find({})
                    .sort(`${sort == -1 ? "-" : ""}${order}`)
                    .skip(offset)
                    .limit(limit);
            }
            res.send({ count: count, monitors: monitors });
        } catch (error) {
            res.status(400).send(error.message);
        }
    };

    private getById = async (req: Request, res: Response) => {
        try {
            const id = req.params.id;
            const document = await this.nsideM.findById(id).populate("monitor", "-_id");
            if (document) {
                res.send(document);
            } else {
                res.status(404).send(`Document with id ${id} not found!`);
            }
        } catch (error) {
            res.status(400).send(error.message);
        }
    };

    private create = async (req: Request, res: Response) => {
        try {
            const data = await this.nsideM.find().populate("monitor", "-_id");
            const body = req.body;
            let newId = 0;
            if(data.length > 0){
                data.forEach(element => {
                    newId = element._id > newId ? element._id : newId;
                });
            }
            
            const createdDocument = new this.nsideM({
                _id: (newId+1),
                ...body,
            });
            const savedDocument = await createdDocument.save();
            res.send(savedDocument);
        } catch (error) {
            res.status(400).send(error.message);
        }
    };

    private modifyPUT = async (req: Request, res: Response) => {
        try {
            const id = req.params.id;
            const body = req.body;
            const modificationResult = await this.nsideM.replaceOne({ _id: id }, body, { runValidators: true });
            if (modificationResult.modifiedCount) {
                const updatedDoc = await this.nsideM.findById(id).populate("monitor", "-_id");
                res.send(updatedDoc);
            } else {
                res.status(404).send(`Document with id ${id} not found!`);
            }
        } catch (error) {
            res.status(400).send(error.message);
        }
    };

    
    private delete = async (req: Request, res: Response) => {
        try {
            const id = req.params.id;
            const successResponse = await this.nsideM.findByIdAndDelete(id);
            if (successResponse) {
                res.status(200).send('OK');
            } else {
                res.status(404).send(`Document with id ${id} not found!`);
            }
        } catch (error) {
            res.status(400).send(error.message);
        }
    };
}