<?php

namespace App\Controller;

use App\Entity\User;
use App\Repository\UserRepository;
use Doctrine\ORM\EntityManagerInterface;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\Routing\Annotation\Route;

class UserController extends AbstractController
{
    // Lister tous les utilisateurs
    #[Route('/api/users', name: 'get_users', methods: ['GET'])]
    public function getUsers(UserRepository $userRepository): JsonResponse
    {
        // Récupérer tous les utilisateurs
        $users = $userRepository->findAll();

        // Transformer les entités en tableau pour JSON
        $data = [];
        foreach ($users as $user) {
            $data[] = [
                'id' => $user->getId(),
                'email' => $user->getEmail(),
                'created_at' => $user->getCreatedAt()->format('Y-m-d H:i:s'),
            ];
        }

        return $this->json($data);
    }

    // Ajouter un nouvel utilisateur
    #[Route('/api/users', name: 'add_user', methods: ['POST'])]
    public function addUser(Request $request, EntityManagerInterface $entityManager): JsonResponse
    {
        $data = json_decode($request->getContent(), true);

        // Vérifier que les données nécessaires sont présentes
        if (!isset($data['email']) || !isset($data['password'])) {
            return $this->json(['error' => 'Invalid data'], JsonResponse::HTTP_BAD_REQUEST);
        }

        // Créer un nouvel utilisateur
        $user = new User();
        $user->setEmail($data['email']);
        $user->setPassword(password_hash($data['password'], PASSWORD_BCRYPT)); // Hasher le mot de passe
        $user->setCreatedAt(new \DateTimeImmutable());

        // Sauvegarder dans la base de données
        $entityManager->persist($user);
        $entityManager->flush();

        return $this->json(['message' => 'User created successfully'], JsonResponse::HTTP_CREATED);
    }
}
