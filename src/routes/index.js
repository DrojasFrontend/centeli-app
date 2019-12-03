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

module.exports = router;