<?php

namespace App\Controller;

use App\Entity\Expense;
use App\Repository\ExpenseRepository;
use App\Repository\CategoryRepository;
use Doctrine\ORM\EntityManagerInterface;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\Routing\Annotation\Route;
use Symfony\Component\Serializer\SerializerInterface;
use App\Entity\Category;
use App\Entity\User;
class ExpenseController extends AbstractController
{
    private EntityManagerInterface $entityManager;

    public function __construct(EntityManagerInterface $entityManager)
    {
        $this->entityManager = $entityManager;
    }
    // Récupérer toutes les dépenses
    #[Route('/api/expenses', name: 'get_expenses', methods: ['GET'])]
    public function getExpenses(ExpenseRepository $repository): JsonResponse
    {
        $expenses = $repository->findAll();

        $data = [];
        foreach ($expenses as $expense) {
            $data[] = [
                'id' => $expense->getId(),
                'label' => $expense->getLabel(),
                'amount' => $expense->getAmount(),
                'date' => $expense->getDate()->format('Y-m-d'),
                'category' => $expense->getCategory()->getName(),
            ];
        }

        return $this->json($data);
    }

    // Ajouter une dépense
    #[Route('/api/expenses', name: 'add_expense', methods: ['POST'])]
public function addExpense(Request $request, EntityManagerInterface $entityManager): JsonResponse
{
    $data = json_decode($request->getContent(), true);

    // Vérifier que les champs requis sont présents
    if (!isset($data['label'], $data['amount'], $data['date'], $data['category_id'])) {
        return new JsonResponse(['error' => 'Missing required fields'], JsonResponse::HTTP_BAD_REQUEST);
    }

    // Récupérer la catégorie
    $category = $entityManager->getRepository(Category::class)->find($data['category_id']);
    if (!$category) {
        return new JsonResponse(['error' => 'Category not found'], JsonResponse::HTTP_BAD_REQUEST);
    }

    // Créer une nouvelle dépense
    $expense = new Expense();
    $expense->setLabel($data['label']);
    $expense->setAmount((float) $data['amount']);
    $expense->setDate(new \DateTime($data['date']));
    $expense->setCategory($category);

    $entityManager->persist($expense);
    $entityManager->flush();

    return new JsonResponse(['success' => true], JsonResponse::HTTP_CREATED);
}


    // Modifier une dépense
    #[Route('/api/expenses/{id}', name: 'update_expense', methods: ['PUT'])]
    public function updateExpense(int $id, Request $request, EntityManagerInterface $em, ExpenseRepository $repository): JsonResponse
    {
        $data = json_decode($request->getContent(), true);

        $expense = $repository->find($id);
        if (!$expense) {
            return $this->json(['error' => 'Expense not found'], JsonResponse::HTTP_NOT_FOUND);
        }

        if (isset($data['label'])) $expense->setLabel($data['label']);
        if (isset($data['amount'])) $expense->setAmount($data['amount']);
        if (isset($data['date'])) $expense->setDate(new \DateTime($data['date']));

        $em->flush();

        return $this->json(['message' => 'Expense updated successfully']);
    }

    // Supprimer une dépense
    #[Route('/api/expenses/{id}', name: 'delete_expense', methods: ['DELETE'])]
    public function deleteExpense(int $id, EntityManagerInterface $em, ExpenseRepository $repository): JsonResponse
    {
        $expense = $repository->find($id);
        if (!$expense) {
            return $this->json(['error' => 'Expense not found'], JsonResponse::HTTP_NOT_FOUND);
        }

        $em->remove($expense);
        $em->flush();

        return $this->json(['message' => 'Expense deleted successfully']);
    }
}
