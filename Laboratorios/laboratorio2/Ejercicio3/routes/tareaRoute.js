const express = require('express');
const router = express.Router();
const Tarea = require('../Model/tareaModel.js');

// Obtener todas las tareas
router.get('/', async (req, res) => {
  try {
    const tareas = await Tarea.find();
    
    if (tareas.length === 0) {
      return res.status(404).json({ 
        status: 'success',
        message: 'No se encontraron tareas'
      });
    }
    
    res.status(200).json({
      status: 'success',
      message: 'Tareas encontradas exitosamente',
      data: {
        tareas: tareas
      }
    });
  } catch (error) {
    res.status(500).json({ 
      status: 'error',
      message: 'Error al obtener las tareas',
      error: error.message 
    });
  }
});

// Crear una nueva tarea
router.post('/', async (req, res) => {
  try {
    const { titulo, descripcion } = req.body;
    const tarea = new Tarea({
      titulo,
      descripcion
    });

    const tareaGuardada = await tarea.save();
    res.status(201).json({
      status: 'success',
      message: 'Tarea creada exitosamente',
      data: {
        tarea: tareaGuardada
      }
    });      
  } catch (error) {
    res.status(500).json({ 
      status: 'error',
      message: 'Error al crear la tarea',
      error: error.message 
    });
  }
});


// Actualizar una tarea
router.put('/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const { titulo, descripcion, estado } = req.body;

    const tareaActualizada = await Tarea.findByIdAndUpdate(
      id,
      { $set: { titulo, descripcion, estado } },
      { new: true, runValidators: true }
    );

    if (!tareaActualizada) {
      return res.status(404).json({ 
        status: 'error',
        message: 'Tarea no encontrada'
      });
    }
    res.status(200).json({
      status: 'success',
      message: 'Tarea actualizada exitosamente',
      data: {
        tarea: tareaActualizada
      }
    });
  } catch (error) {
    res.status(500).json({ 
      status: 'error',
      message: 'Error al actualizar la tarea',
      error: error.message 
    });
  }
});

// Eliminar una tarea
router.delete('/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const tareaEliminada = await Tarea.findByIdAndDelete(id);

    if (!tareaEliminada) {
      return res.status(404).json({ 
        status: 'success',
        message: 'Tarea no encontrada' 
      });
    }

    res.status(200).json({ 
      status: 'success',
      message: 'Tarea eliminada' 
    });
  } catch (error) {
    res.status(500).json({ 
      status: 'error',
      message: 'Error al eliminar la tarea',
      error: error.message 
    });
  }
});

module.exports = router;
