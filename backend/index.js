const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 5000;

// Middlewares ( beech ke sathi )
app.use(cors()); // Frontend se connection ke liye
app.use(express.json()); // JSON data ko samajhne ke liye

// Database se connect karte hain
mongoose.connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
}).then(() => {
    console.log('MongoDB se jud gaye bhai!');
}).catch((err) => {
    console.log('Arre yaar, MongoDB connection me error:', err);
});

// Part ka Schema (Kaisa dikhega data)
const sparePartSchema = new mongoose.Schema({
    partName: { type: String, required: true },
    quantity: { type: Number, required: true },
    machineName: { type: String, required: true },
    location: { type: String, required: true },
    addedOn: { type: Date, default: Date.now }
});

const SparePart = mongoose.model('SparePart', sparePartSchema);

app.get('/', (req,res)=>{
    res.send("Bhai tera backend ekdam mast chal rha hai")
})
// --- API Routes (App ke रास्ते) ---

// 1. Saare parts fetch karne ke liye (GET)
app.get('/api/parts', async (req, res) => {
    try {
        const parts = await SparePart.find({});
        res.json(parts);
    } catch (error) {
        res.status(500).json({ message: 'Parts fetch karne me gadbad ho gayi' });
    }
});

// 2. Naya part add karne ke liye (POST)
app.post('/api/parts', async (req, res) => {
    try {
        const newPart = new SparePart({
            partName: req.body.partName,
            quantity: req.body.quantity,
            machineName: req.body.machineName,
            location: req.body.location
        });
        const savedPart = await newPart.save();
        res.status(201).json(savedPart);
    } catch (error) {
        res.status(400).json({ message: 'Naya part add nahi hua, check your data' });
    }
});

// 3. Quantity update karne ke liye (PUT)
app.put('/api/parts/:id', async (req, res) => {
    try {
        const { id } = req.params;
        const { quantity } = req.body;
        
        const updatedPart = await SparePart.findByIdAndUpdate(
            id,
            { quantity: quantity },
            { new: true } // Yeh updated document return karega
        );
        
        res.json(updatedPart);
    } catch (error) {
        res.status(400).json({ message: 'Quantity update nahi hui' });
    }
});

// Server chalu karte hain
app.listen(PORT, () => {
    console.log(`Server port ${PORT} pe chal raha hai...`);
});