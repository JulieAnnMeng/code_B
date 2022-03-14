class CreateMessages < ActiveRecord::Migration[7.0]
  def change
    create_table :messages do |t|
      t.string :message
      t.belongs_to :user, null: false, foreign_key: true
      t.boolean :received

      t.timestamps
    end
  end
end
