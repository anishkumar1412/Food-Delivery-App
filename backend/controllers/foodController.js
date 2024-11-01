import foodModel from "../models/foodmodel.js";
import  fs from "fs"
// Add food item
const addFood = async (req, res) => {
    // Check if the file was uploaded
    if (!req.file) {
        return res.status(400).json({ success: false, message: "No image uploaded" });
    }
 
    // Retrieve the uploaded file's filename
    let image_filename = `${req.file.filename}`;

    // Create new food item
    const food = new foodModel({
        name: req.body.name,
        description: req.body.description,
        price: req.body.price,
        category: req.body.category,
        image: image_filename,
    });

    try { 
        await food.save();
        res.json({ success: true, message: "Food Added" });
    } catch (error) {
        console.error(error);
        res.json({ success: false, message: "Error adding food" });
    }
};

// all fodd list

const listFood = async (req,res) =>{
    try {
        const foods = await foodModel.find({});
        res.json({success:true, data:foods})
    } catch (error) {
        console.log(error);
        res.json({success: false, message: "Error"})
    }
}


// remove food item 

const removeFood = async(req, res)=>{
 try {
    const food = await foodModel.findById(req.body.id);
    fs.unlink(`uploads/${food.image}`, ()=>{})

    await foodModel.findByIdAndDelete(req.body.id);
    res.json({success:true, message: "Food Removed"})
 } catch (error) {
    console.log(error);
    res.json({success: false, message: "Error"})
 }
}
export { addFood,listFood, removeFood };
