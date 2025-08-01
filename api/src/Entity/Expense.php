<?php

namespace App\Entity;

use ApiPlatform\Metadata\ApiResource;
use ApiPlatform\Metadata\Get;
use ApiPlatform\Metadata\GetCollection;
use ApiPlatform\Metadata\Post;
use ApiPlatform\Metadata\Put;
use ApiPlatform\Metadata\Delete;
use App\Repository\ExpenseRepository;
use Doctrine\ORM\Mapping as ORM;
use Symfony\Component\Serializer\Annotation\Groups;
use App\Entity\Category;
use App\Entity\User;
use App\State\ExpenseProcessor; // <-- importe le processor !

#[ApiResource(
    normalizationContext: ['groups' => ['expense:read']],
    denormalizationContext: ['groups' => ['expense:write']],
    operations: [
        new Get(),
        new GetCollection(),
        new Post(processor: ExpenseProcessor::class),
        new Put(processor: ExpenseProcessor::class),
        new Delete(),                     // ← AUCUN processor ici
    ]
    

)]
#[ORM\Entity(repositoryClass: ExpenseRepository::class)]
class Expense
{
    #[ORM\Id, ORM\GeneratedValue, ORM\Column(type: 'integer')]
    #[Groups(['expense:read'])]
    private ?int $id = null;

    #[ORM\Column(type: 'string', length: 255)]
    #[Groups(['expense:read', 'expense:write'])]
    private ?string $label = null;

    #[ORM\Column(type: 'decimal', precision: 10, scale: 2)]
    #[Groups(['expense:read', 'expense:write'])]
    private ?string $amount = null;

    #[ORM\Column(type: 'date')]
    #[Groups(['expense:read', 'expense:write'])]
    private ?\DateTimeInterface $date = null;

    #[ORM\ManyToOne(targetEntity: Category::class, inversedBy: 'expenses')]
    #[ORM\JoinColumn(nullable: false)]
    #[Groups(['expense:read', 'expense:write'])]
    private ?Category $category = null;

    #[ORM\ManyToOne(targetEntity: User::class, inversedBy: 'expenses')]
    #[ORM\JoinColumn(nullable: false)]
    #[Groups(['expense:read', 'expense:write'])]
    private ?User $user = null;

    public function getId(): ?int { return $this->id; }
    public function getLabel(): ?string { return $this->label; }
    public function setLabel(string $label): self { $this->label = $label; return $this; }
    public function getAmount(): ?string { return $this->amount; }
    public function setAmount(string $amount): self { $this->amount = $amount; return $this; }
    public function getDate(): ?\DateTimeInterface { return $this->date; }
    public function setDate(\DateTimeInterface $date): self { $this->date = $date; return $this; }
    public function getCategory(): ?Category { return $this->category; }
    public function setCategory(?Category $category): self { $this->category = $category; return $this; }
    public function getUser(): ?User { return $this->user; }
    public function setUser(?User $user): self { $this->user = $user; return $this; }
}
