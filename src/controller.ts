import { Router, Request, Response } from 'express';
import CategoryService from './service';

const router = Router();
const categoryService = new CategoryService();

router.post('/', async (req: Request, res: Response) => {
  try {
    const savedData = await categoryService.createCategory(req.body);
    res.status(201).json(savedData);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

router.patch('/:id', async (req, res) => {
  const { id } = req.params;
  const updates = req.body;
  const updatedCategory = await categoryService.patchCategoryById(id, updates);
  res.status(200).send(updatedCategory);
});

router.delete('/:id', async (req, res) => {
  const { id } = req.params;
  const deletedCategory = await categoryService.deletedById(id);
  res.status(204).send(deletedCategory);
});

router.get('/:id', async (req, res) => {
  const category = await categoryService.getCategoryById(req.params.id);
  res.status(200).send(category);
});

router.get('/', async (req, res) => {
  const categories = await categoryService.getCategories();
  res.status(200).send(categories);
});

router.get('/slug/:slug', async (req, res) => {
  const categories = await categoryService.getCategoryBySlug(req.params.slug);
  res.status(200).send(categories);
});

export default router;
