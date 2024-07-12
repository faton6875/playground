import { Router, Request, Response, NextFunction } from 'express';
import CategoryService from './service';
import { body, query, validationResult } from 'express-validator';

const router = Router();
const categoryService = new CategoryService();

router.post(
  '/',
  body('slug').notEmpty().isString(),
  body('name').notEmpty().isString(),
  body('active').notEmpty().isBoolean(),

  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const errors = validationResult(req);

      if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
      }
      const savedData = await categoryService.createCategory(req.body);
      res.status(201).json(savedData);
    } catch (error) {
      next(error);
    }
  }
);

router.patch(
  '/:id',
  async (req: Request, res: Response, next: NextFunction) => {
    const { id } = req.params;
    const updates = req.body;
    try {
      const updatedCategory = await categoryService.patchCategoryById(
        id,
        updates
      );
      res.status(200).json(updatedCategory);
    } catch (error) {
      next(error);
    }
  }
);

router.delete(
  '/:id',
  async (req: Request, res: Response, next: NextFunction) => {
    const { id } = req.params;
    try {
      await categoryService.deleteById(id);
      res.status(200).json('Category deleted');
    } catch (error) {
      next(error);
    }
  }
);

router.get('/:id', async (req: Request, res: Response, next: NextFunction) => {
  try {
    const category = await categoryService.getCategoryById(req.params.id);
    res.status(200).json(category);
  } catch (error) {
    next(error);
  }
});

router.get(
  '/',
  query('page').isNumeric().optional(),
  query('pageSize').isNumeric().isLength({ min: 1, max: 9 }).optional(),
  query('name').optional().isString().trim(),
  query('description').optional().isString().trim(),
  query('search').optional().isString().trim(),
  query('active').isIn([0, 1, true, false]).toBoolean().optional(),
  query('sort').optional().isString().trim(),
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { page, pageSize, name, description, search, active, sort } =
        req.query;
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
      }

      const categories = await categoryService.getCategories(
        Number(page),
        Number(pageSize),
        String(name),
        String(description),
        String(search),
        Boolean(active),
        String(sort)
      );
      res.status(200).send(categories);
    } catch (error) {
      next(error);
    }
  }
);

router.get(
  '/slug/:slug',
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const category = await categoryService.getCategoryBySlug(req.params.slug);
      res.status(200).json(category);
    } catch (error) {
      next(error);
    }
  }
);

export default router;
