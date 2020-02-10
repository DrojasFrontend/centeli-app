const express = require('express');
const router = express.Router();

const Device = require('../models/device')

router.get('/', async (req, res) => {
    const devices = await Device.find();
    console.log(devices);
    res.render('index', {
        devices
    })
})

router.post('/add', async (req, res) => {
    const device = new Device(req.body)
    await device.save();
    res.redirect('/')
})

router.get('/enable/:id', async (req, res) => {
    const { id } = req.params;
    const device = await Device.findById(id);
    device.status = !device.status;
    await device.save();
    res.redirect('/')
})

router.get('/delete/:id', async (req, res) => {
    const { id } = req.params;
    await Device.remove({_id: id});
    res.redirect('/')
})

router.get('/edit/:id', async (req, res) => {
    const { id } = req.params;
    const device = await Device.findById(id);
    res.render('edit', {
        device
    });
})

router.post('/edit/:id', async (req, res) => {
    const { id } = req.params;
    await Device.update({_id: id}, req.body);
    res.redirect('/');
})

router.get('/print/:id', async (req, res) => {
    const { id } = req.params;
    const device = await Device.findById(id);
    res.render('print', {
        device
    });
})

// Search $regex
router.get('/search/:search', (req, res) => {
    var searchString = req.params.search;
    Device.find({ "$or": [
        {"nit": { "$regex": searchString, "$options": "i" }},
        {"tipoDevice": { "$regex": searchString, "$options": "i" }}
    ]})
    .sort([['date', 'descending']])
    .exec((err, devices) => {

        if(err) {
            return res.status(500).send({
                status: 'Error',
                message: 'Error en la peticion'
            });
        }

        if(!devices || devices.length <= 0) {
            return res.status(404).send({
                status: 'Error',
                message: 'no hay resultados'
            });
        }

        return res.status(200).send({
            status: 'success',
            devices
        });

    })
});

module.exports = router;