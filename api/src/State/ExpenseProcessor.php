<?php
// src/State/ExpenseProcessor.php
namespace App\State;

use ApiPlatform\Metadata\Operation;
use ApiPlatform\State\ProcessorInterface;
use App\Entity\Expense;
use Symfony\Component\Security\Core\Security;

class ExpenseProcessor implements ProcessorInterface
{
    public function __construct(
        private ProcessorInterface $persistProcessor,   // ← on injecte le processor d’origine
        private Security $security
    ) {}

    public function process($data, Operation $operation, array $uriVariables = [], array $context = []): mixed
    {
        if ($data instanceof Expense && null === $data->getUser()) {
            $user = $this->security->getUser();
            if (!$user) {
                throw new \LogicException('Aucun utilisateur connecté.');
            }
            $data->setUser($user);
        }

        // ★ on délègue à la persistance par défaut (insert + flush)
        return $this->persistProcessor->process($data, $operation, $uriVariables, $context);
    }
}
