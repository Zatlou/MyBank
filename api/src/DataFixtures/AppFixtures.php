<?php

namespace App\DataFixtures;

use App\Entity\User;
use Doctrine\Bundle\FixturesBundle\Fixture;
use Doctrine\Persistence\ObjectManager;
use Symfony\Component\PasswordHasher\Hasher\UserPasswordHasherInterface;

class AppFixtures extends Fixture
{
    private UserPasswordHasherInterface $hasher;

    public function __construct(UserPasswordHasherInterface $hasher)
    {
        $this->hasher = $hasher;
    }

    public function load(ObjectManager $manager): void
    {
        $user = new User();
        $user->setEmail('test@example.com');
        $user->setRoles(['ROLE_USER']);
        $hashedPassword = $this->hasher->hashPassword($user, 'password');
        $user->setPassword($hashedPassword);
    
        $manager->persist($user);
        $manager->flush();
    
        // C’EST CETTE LIGNE QUI MANQUAIT
        $this->addReference('default-user', $user);
    }
    
}
