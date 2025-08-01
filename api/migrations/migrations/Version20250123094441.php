<?php

declare(strict_types=1);

namespace DoctrineMigrations;

use Doctrine\DBAL\Schema\Schema;
use Doctrine\Migrations\AbstractMigration;

/**
 * Auto-generated Migration: Please modify to your needs!
 */
final class Version20250123094441 extends AbstractMigration
{
    public function getDescription(): string
    {
        return 'Modifie les colonnes category_id, user_id, amount et date dans la table expense.';
    }

    public function up(Schema $schema): void
    {
        // Modifie directement les colonnes sans supprimer les contraintes inexistantes
        $this->addSql('ALTER TABLE expense CHANGE category_id category_id INT NOT NULL');
        $this->addSql('ALTER TABLE expense CHANGE user_id user_id INT NOT NULL');
        $this->addSql('ALTER TABLE expense CHANGE amount amount NUMERIC(10, 2) NOT NULL');
        $this->addSql('ALTER TABLE expense CHANGE date date DATE NOT NULL');
    
        // Ajoute les contraintes de clé étrangère si elles n'existent pas encore
        $this->addSql('ALTER TABLE expense ADD CONSTRAINT FK_2D3A8DA612469DE2 FOREIGN KEY (category_id) REFERENCES category (id)');
        $this->addSql('ALTER TABLE expense ADD CONSTRAINT FK_2D3A8DA6A76ED395 FOREIGN KEY (user_id) REFERENCES user (id)');
    }
    
    public function down(Schema $schema): void
    {
        // Supprime les contraintes ajoutées si nécessaire
        $this->addSql('ALTER TABLE expense DROP FOREIGN KEY IF EXISTS FK_2D3A8DA612469DE2');
        $this->addSql('ALTER TABLE expense DROP FOREIGN KEY IF EXISTS FK_2D3A8DA6A76ED395');
    
        // Réinitialise les colonnes à leur état précédent
        $this->addSql('ALTER TABLE expense CHANGE category_id category_id INT DEFAULT NULL');
        $this->addSql('ALTER TABLE expense CHANGE user_id user_id INT DEFAULT NULL');
        $this->addSql('ALTER TABLE expense CHANGE amount amount DOUBLE PRECISION NOT NULL');
        $this->addSql('ALTER TABLE expense CHANGE date date DATE DEFAULT NULL');
    }
    
    
}
