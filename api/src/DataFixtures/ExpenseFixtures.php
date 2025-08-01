<?php
// src/DataFixtures/ExpenseFixtures.php
namespace App\DataFixtures;

use App\Entity\Category;
use App\Entity\Expense;
use App\Entity\User;
use Doctrine\Bundle\FixturesBundle\Fixture;
use Doctrine\Common\DataFixtures\DependentFixtureInterface;
use Doctrine\Persistence\ObjectManager;

class ExpenseFixtures extends Fixture implements DependentFixtureInterface
{
    public function getDependencies(): array
    {
        return [
            AppFixtures::class,   // on dépend de ton fixture User
        ];
    }

    public function load(ObjectManager $manager): void
{
    /** @var User $user */
    $user = $this->getReference('default-user');

    // Plusieurs catégories
    $categories = [];
    foreach (['Alimentation', 'Logement', 'Transports', 'Loisirs'] as $name) {
        $category = new Category();
        $category->setName($name);
        $manager->persist($category);
        $categories[] = $category;
    }

    // Plusieurs dépenses, une par catégorie
    foreach ($categories as $i => $category) {
        $expense = new Expense();
        $expense->setLabel("Dépense " . ($i + 1));
        $expense->setAmount(50 + $i * 10);
        $expense->setDate(new \DateTimeImmutable());
        $expense->setCategory($category);
        $expense->setUser($user);
        $manager->persist($expense);
    }

    $manager->flush();
}

}
