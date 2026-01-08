import { useState } from 'react';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import Icon from '@/components/ui/icon';

interface Build {
  id: number;
  title: string;
  description: string;
  difficulty: string;
  materials: string[];
  likes: number;
  image: string;
  steps?: string[];
  tips?: string;
}

interface Material {
  name: string;
  icon: string;
  category: string;
}

const Index = () => {
  const [selectedBuild, setSelectedBuild] = useState<Build | null>(null);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [myProjects, setMyProjects] = useState<Build[]>([]);
  
  const [builds, setBuilds] = useState<Build[]>([
    {
      id: 1,
      title: 'Средневековый замок',
      description: 'Массивный замок с башнями и рвом',
      difficulty: 'Сложно',
      materials: ['Камень', 'Дерево', 'Вода'],
      likes: 1247,
      image: '🏰',
      steps: ['Создайте основание из камня 20x20', 'Постройте 4 башни по углам высотой 15 блоков', 'Соедините башни стенами высотой 10 блоков', 'Добавьте деревянные ворота', 'Выкопайте ров вокруг замка глубиной 3 блока', 'Заполните ров водой'],
      tips: 'Используйте разные виды камня для текстуры. Добавьте флаги на башнях из шерсти и заборов.'
    },
    {
      id: 2,
      title: 'Современный дом',
      description: 'Минималистичный дом с бассейном',
      difficulty: 'Средне',
      materials: ['Кварц', 'Стекло', 'Бетон'],
      likes: 892,
      image: '🏠',
      steps: ['Создайте платформу из бетона 15x15', 'Постройте стены из кварца высотой 5 блоков', 'Установите большие окна из стекла', 'Создайте плоскую крышу', 'Выкопайте бассейн 5x8 глубиной 2 блока', 'Добавьте внутреннюю отделку'],
      tips: 'Используйте белый и серый бетон для контраста. Добавьте светильники внутри для атмосферы.'
    },
    {
      id: 3,
      title: 'Ферма автоматическая',
      description: 'Ферма для выращивания урожая',
      difficulty: 'Легко',
      materials: ['Редстоун', 'Поршни', 'Воронки'],
      likes: 2103,
      image: '🌾',
      steps: ['Создайте площадку 9x9 из земли', 'В центре разместите воду', 'Засадите землю пшеницей/морковью', 'Под землёй установите воронки', 'Подключите поршни к редстоуну', 'Настройте таймер на повторитель'],
      tips: 'Используйте компаратор для автоматического сбора. Добавьте сундуки под воронками.'
    },
    {
      id: 4,
      title: 'Подводная база',
      description: 'База под водой со стеклянным куполом',
      difficulty: 'Сложно',
      materials: ['Стекло', 'Призмарин', 'Морской фонарь'],
      likes: 1567,
      image: '🌊'
    },
    {
      id: 5,
      title: 'Небесный остров',
      description: 'Летающий остров с водопадами',
      difficulty: 'Средне',
      materials: ['Камень', 'Трава', 'Вода'],
      likes: 934,
      image: '☁️'
    },
    {
      id: 6,
      title: 'Пиксель-арт дракон',
      description: 'Огромный дракон из блоков',
      difficulty: 'Сложно',
      materials: ['Шерсть', 'Терракота', 'Бетон'],
      likes: 1876,
      image: '🐉'
    }
  ]);

  const [materials] = useState<Material[]>([
    { name: 'Камень', icon: '🪨', category: 'Природные' },
    { name: 'Дерево', icon: '🪵', category: 'Природные' },
    { name: 'Стекло', icon: '🔷', category: 'Крафт' },
    { name: 'Редстоун', icon: '🔴', category: 'Механика' },
    { name: 'Кварц', icon: '⬜', category: 'Декор' },
    { name: 'Алмаз', icon: '💎', category: 'Редкие' },
    { name: 'Изумруд', icon: '💚', category: 'Редкие' },
    { name: 'Золото', icon: '🟡', category: 'Редкие' },
    { name: 'Железо', icon: '⚙️', category: 'Ресурсы' },
    { name: 'Шерсть', icon: '🧶', category: 'Декор' },
    { name: 'Призмарин', icon: '🟦', category: 'Океан' },
    { name: 'Обсидиан', icon: '⬛', category: 'Редкие' }
  ]);

  const [newBuild, setNewBuild] = useState({
    title: '',
    description: '',
    difficulty: 'Средне',
    materials: ''
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const build: Build = {
      id: builds.length + 1,
      title: newBuild.title,
      description: newBuild.description,
      difficulty: newBuild.difficulty,
      materials: newBuild.materials.split(',').map(m => m.trim()),
      likes: 0,
      image: '🏗️'
    };
    setBuilds([build, ...builds]);
    setMyProjects([build, ...myProjects]);
    setNewBuild({ title: '', description: '', difficulty: 'Средне', materials: '' });
  };

  const handleSaveToMyProjects = (build: Build) => {
    if (!myProjects.find(p => p.id === build.id)) {
      setMyProjects([...myProjects, build]);
    }
  };

  const handleLike = (id: number) => {
    setBuilds(builds.map(build => 
      build.id === id ? { ...build, likes: build.likes + 1 } : build
    ));
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#87CEEB] to-[#7CB342]">
      <header className="bg-[#8D6E63] border-b-4 border-[#5D4037] minecraft-shadow sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <h1 className="text-2xl md:text-3xl text-white drop-shadow-[2px_2px_0_rgba(0,0,0,0.3)]">
              ⛏️ MineBuild
            </h1>
            <nav className="flex gap-2">
              <Button 
                onClick={() => window.location.href = '/chatgpt'}
                variant="ghost" 
                className="text-white hover:bg-[#5D4037] minecraft-border border-transparent hover:border-white"
              >
                <Icon name="Bot" size={20} className="mr-2" />
                <span className="hidden sm:inline">AI Помощник</span>
              </Button>
              <Button variant="ghost" className="text-white hover:bg-[#5D4037] minecraft-border border-transparent hover:border-white">
                <Icon name="User" size={20} />
              </Button>
            </nav>
          </div>
        </div>
      </header>

      <main className="container mx-auto px-4 py-8">
        <Tabs defaultValue="gallery" className="w-full">
          <TabsList className="grid w-full grid-cols-5 md:grid-cols-5 bg-[#616161] p-1 gap-1 minecraft-border border-black">
            <TabsTrigger 
              value="gallery" 
              className="data-[state=active]:bg-[#7CB342] text-white font-bold minecraft-border border-transparent data-[state=active]:border-black"
            >
              <Icon name="Image" size={16} className="mr-1" />
              <span className="hidden sm:inline">Галерея</span>
            </TabsTrigger>
            <TabsTrigger 
              value="constructor" 
              className="data-[state=active]:bg-[#7CB342] text-white font-bold minecraft-border border-transparent data-[state=active]:border-black"
            >
              <Icon name="Hammer" size={16} className="mr-1" />
              <span className="hidden sm:inline">Конструктор</span>
            </TabsTrigger>
            <TabsTrigger 
              value="myprojects" 
              className="data-[state=active]:bg-[#7CB342] text-white font-bold minecraft-border border-transparent data-[state=active]:border-black"
            >
              <Icon name="Folder" size={16} className="mr-1" />
              <span className="hidden sm:inline">Мои проекты</span>
            </TabsTrigger>
            <TabsTrigger 
              value="materials" 
              className="data-[state=active]:bg-[#7CB342] text-white font-bold minecraft-border border-transparent data-[state=active]:border-black"
            >
              <Icon name="Package" size={16} className="mr-1" />
              <span className="hidden sm:inline">Материалы</span>
            </TabsTrigger>
            <TabsTrigger 
              value="community" 
              className="data-[state=active]:bg-[#7CB342] text-white font-bold minecraft-border border-transparent data-[state=active]:border-black"
            >
              <Icon name="Users" size={16} className="mr-1" />
              <span className="hidden sm:inline">Сообщество</span>
            </TabsTrigger>
          </TabsList>

          <TabsContent value="gallery" className="mt-6">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {builds.map((build) => (
                <Card 
                  key={build.id} 
                  className="minecraft-border border-black minecraft-shadow hover:translate-x-[-2px] hover:translate-y-[-2px] hover:shadow-[6px_6px_0_rgba(0,0,0,0.3)] transition-all bg-white"
                >
                  <CardHeader className="pb-3">
                    <div className="text-6xl text-center mb-2">{build.image}</div>
                    <CardTitle className="text-lg leading-relaxed">{build.title}</CardTitle>
                    <CardDescription className="font-normal">{build.description}</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="flex flex-wrap gap-2 mb-3">
                      {build.materials.map((material, idx) => (
                        <Badge 
                          key={idx} 
                          variant="secondary"
                          className="minecraft-border border-[#8D6E63] bg-[#D7CCC8] text-[#3E2723] font-bold"
                        >
                          {material}
                        </Badge>
                      ))}
                    </div>
                    <Badge 
                      variant={build.difficulty === 'Легко' ? 'default' : build.difficulty === 'Средне' ? 'secondary' : 'destructive'}
                      className="minecraft-border border-black font-bold"
                    >
                      {build.difficulty}
                    </Badge>
                  </CardContent>
                  <CardFooter className="flex justify-between">
                    <Button 
                      onClick={() => handleLike(build.id)}
                      variant="outline" 
                      className="minecraft-border border-[#EF5350] hover:bg-[#EF5350] hover:text-white font-bold"
                    >
                      <Icon name="Heart" size={16} className="mr-1" />
                      {build.likes}
                    </Button>
                    <Button 
                      onClick={() => {
                        setSelectedBuild(build);
                        setIsDialogOpen(true);
                      }}
                      className="minecraft-border border-black bg-[#42A5F5] hover:bg-[#1E88E5] font-bold"
                    >
                      Открыть
                    </Button>
                  </CardFooter>
                </Card>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="constructor" className="mt-6">
            <Card className="minecraft-border border-black minecraft-shadow bg-white max-w-2xl mx-auto">
              <CardHeader>
                <CardTitle className="text-2xl">Создать постройку</CardTitle>
                <CardDescription className="text-base">Добавь свою идею в галерею</CardDescription>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div>
                    <label className="font-bold mb-2 block">Название</label>
                    <Input 
                      value={newBuild.title}
                      onChange={(e) => setNewBuild({ ...newBuild, title: e.target.value })}
                      placeholder="Например: Подземный город"
                      className="minecraft-border border-[#616161] font-normal"
                      required
                    />
                  </div>
                  <div>
                    <label className="font-bold mb-2 block">Описание</label>
                    <Textarea 
                      value={newBuild.description}
                      onChange={(e) => setNewBuild({ ...newBuild, description: e.target.value })}
                      placeholder="Опиши свою идею..."
                      className="minecraft-border border-[#616161] font-normal resize-none"
                      rows={4}
                      required
                    />
                  </div>
                  <div>
                    <label className="font-bold mb-2 block">Сложность</label>
                    <select 
                      value={newBuild.difficulty}
                      onChange={(e) => setNewBuild({ ...newBuild, difficulty: e.target.value })}
                      className="w-full minecraft-border border-[#616161] p-2 bg-white font-normal"
                    >
                      <option>Легко</option>
                      <option>Средне</option>
                      <option>Сложно</option>
                    </select>
                  </div>
                  <div>
                    <label className="font-bold mb-2 block">Материалы (через запятую)</label>
                    <Input 
                      value={newBuild.materials}
                      onChange={(e) => setNewBuild({ ...newBuild, materials: e.target.value })}
                      placeholder="Камень, Дерево, Стекло"
                      className="minecraft-border border-[#616161] font-normal"
                      required
                    />
                  </div>
                  <Button 
                    type="submit" 
                    className="w-full minecraft-border border-black bg-[#7CB342] hover:bg-[#689F38] font-bold text-lg py-6"
                  >
                    <Icon name="Plus" size={20} className="mr-2" />
                    Добавить постройку
                  </Button>
                </form>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="myprojects" className="mt-6">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {myProjects.length === 0 ? (
                <Card className="minecraft-border border-black minecraft-shadow bg-white col-span-full">
                  <CardContent className="text-center py-12">
                    <div className="text-6xl mb-4">📦</div>
                    <p className="text-xl font-bold mb-2">Здесь пока пусто</p>
                    <p className="text-muted-foreground">Создай постройку в конструкторе или сохрани из галереи</p>
                  </CardContent>
                </Card>
              ) : (
                myProjects.map((build) => (
                  <Card 
                    key={build.id} 
                    className="minecraft-border border-black minecraft-shadow hover:translate-x-[-2px] hover:translate-y-[-2px] hover:shadow-[6px_6px_0_rgba(0,0,0,0.3)] transition-all bg-white"
                  >
                    <CardHeader className="pb-3">
                      <div className="text-6xl text-center mb-2">{build.image}</div>
                      <CardTitle className="text-lg leading-relaxed">{build.title}</CardTitle>
                      <CardDescription className="font-normal">{build.description}</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="flex flex-wrap gap-2 mb-3">
                        {build.materials.map((material, idx) => (
                          <Badge 
                            key={idx} 
                            variant="secondary"
                            className="minecraft-border border-[#8D6E63] bg-[#D7CCC8] text-[#3E2723] font-bold"
                          >
                            {material}
                          </Badge>
                        ))}
                      </div>
                      <Badge 
                        variant={build.difficulty === 'Легко' ? 'default' : build.difficulty === 'Средне' ? 'secondary' : 'destructive'}
                        className="minecraft-border border-black font-bold"
                      >
                        {build.difficulty}
                      </Badge>
                    </CardContent>
                    <CardFooter className="flex justify-between">
                      <Button 
                        onClick={() => {
                          setSelectedBuild(build);
                          setIsDialogOpen(true);
                        }}
                        className="w-full minecraft-border border-black bg-[#42A5F5] hover:bg-[#1E88E5] font-bold"
                      >
                        Открыть инструкцию
                      </Button>
                    </CardFooter>
                  </Card>
                ))
              )}
            </div>
          </TabsContent>

          <TabsContent value="materials" className="mt-6">
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
              {materials.map((material, idx) => (
                <Card 
                  key={idx}
                  className="minecraft-border border-black minecraft-shadow hover:translate-x-[-2px] hover:translate-y-[-2px] hover:shadow-[6px_6px_0_rgba(0,0,0,0.3)] transition-all bg-white cursor-pointer"
                >
                  <CardHeader className="text-center pb-2">
                    <div className="text-5xl mb-2">{material.icon}</div>
                    <CardTitle className="text-base leading-relaxed">{material.name}</CardTitle>
                    <Badge variant="outline" className="mt-2 minecraft-border border-[#616161] font-bold">
                      {material.category}
                    </Badge>
                  </CardHeader>
                </Card>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="community" className="mt-6">
            <div className="max-w-4xl mx-auto">
              <Card className="minecraft-border border-black minecraft-shadow bg-white mb-6">
                <CardHeader className="text-center">
                  <CardTitle className="text-2xl mb-2">Сообщество строителей</CardTitle>
                  <CardDescription className="text-base">Общайся с другими игроками и делись идеями</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="p-4 minecraft-border border-[#7CB342] bg-[#F1F8E9]">
                    <div className="flex items-center gap-3 mb-2">
                      <div className="text-2xl">👤</div>
                      <div>
                        <p className="font-bold">Steve_Builder</p>
                        <p className="text-sm text-muted-foreground">2 часа назад</p>
                      </div>
                    </div>
                    <p className="font-normal">Построил огромный замок на сервере! Кому показать?</p>
                    <div className="flex gap-2 mt-3">
                      <Button size="sm" variant="outline" className="minecraft-border border-[#616161] font-bold">
                        <Icon name="MessageCircle" size={14} className="mr-1" />
                        24
                      </Button>
                      <Button size="sm" variant="outline" className="minecraft-border border-[#EF5350] font-bold">
                        <Icon name="Heart" size={14} className="mr-1" />
                        156
                      </Button>
                    </div>
                  </div>

                  <div className="p-4 minecraft-border border-[#42A5F5] bg-[#E3F2FD]">
                    <div className="flex items-center gap-3 mb-2">
                      <div className="text-2xl">👤</div>
                      <div>
                        <p className="font-bold">Alex_Creative</p>
                        <p className="text-sm text-muted-foreground">5 часов назад</p>
                      </div>
                    </div>
                    <p className="font-normal">Нужны советы по редстоуну для автоматической фермы!</p>
                    <div className="flex gap-2 mt-3">
                      <Button size="sm" variant="outline" className="minecraft-border border-[#616161] font-bold">
                        <Icon name="MessageCircle" size={14} className="mr-1" />
                        48
                      </Button>
                      <Button size="sm" variant="outline" className="minecraft-border border-[#EF5350] font-bold">
                        <Icon name="Heart" size={14} className="mr-1" />
                        89
                      </Button>
                    </div>
                  </div>

                  <div className="p-4 minecraft-border border-[#8D6E63] bg-[#EFEBE9]">
                    <div className="flex items-center gap-3 mb-2">
                      <div className="text-2xl">👤</div>
                      <div>
                        <p className="font-bold">Notch_Pro</p>
                        <p className="text-sm text-muted-foreground">1 день назад</p>
                      </div>
                    </div>
                    <p className="font-normal">Создал туториал по строительству небесного острова!</p>
                    <div className="flex gap-2 mt-3">
                      <Button size="sm" variant="outline" className="minecraft-border border-[#616161] font-bold">
                        <Icon name="MessageCircle" size={14} className="mr-1" />
                        92
                      </Button>
                      <Button size="sm" variant="outline" className="minecraft-border border-[#EF5350] font-bold">
                        <Icon name="Heart" size={14} className="mr-1" />
                        340
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>
        </Tabs>
      </main>

      <footer className="bg-[#616161] border-t-4 border-black mt-12 py-6">
        <div className="container mx-auto px-4 text-center">
          <p className="text-white font-bold">⛏️ MineBuild 2025 - Строй, делись, вдохновляй!</p>
        </div>
      </footer>

      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent className="minecraft-border border-black minecraft-shadow max-w-3xl bg-white max-h-[90vh]">
          {selectedBuild && (
            <>
              <DialogHeader>
                <div className="text-6xl text-center mb-4">{selectedBuild.image}</div>
                <DialogTitle className="text-2xl text-center">{selectedBuild.title}</DialogTitle>
                <DialogDescription className="text-center text-base">
                  {selectedBuild.description}
                </DialogDescription>
              </DialogHeader>
              
              <ScrollArea className="max-h-[60vh] pr-4">
                <div className="space-y-6">
                  <div>
                    <h3 className="font-bold text-lg mb-3 flex items-center gap-2">
                      <Icon name="Package" size={20} />
                      Необходимые материалы
                    </h3>
                    <div className="flex flex-wrap gap-2">
                      {selectedBuild.materials.map((material, idx) => (
                        <Badge 
                          key={idx}
                          variant="secondary"
                          className="minecraft-border border-[#8D6E63] bg-[#D7CCC8] text-[#3E2723] font-bold text-base px-3 py-1"
                        >
                          {material}
                        </Badge>
                      ))}
                    </div>
                  </div>

                  <div>
                    <h3 className="font-bold text-lg mb-3 flex items-center gap-2">
                      <Icon name="Zap" size={20} />
                      Сложность
                    </h3>
                    <Badge 
                      variant={selectedBuild.difficulty === 'Легко' ? 'default' : selectedBuild.difficulty === 'Средне' ? 'secondary' : 'destructive'}
                      className="minecraft-border border-black font-bold text-base px-4 py-2"
                    >
                      {selectedBuild.difficulty}
                    </Badge>
                  </div>

                  {selectedBuild.steps && selectedBuild.steps.length > 0 && (
                    <div>
                      <h3 className="font-bold text-lg mb-3 flex items-center gap-2">
                        <Icon name="ListOrdered" size={20} />
                        Пошаговая инструкция
                      </h3>
                      <div className="space-y-3">
                        {selectedBuild.steps.map((step, idx) => (
                          <div 
                            key={idx}
                            className="p-3 minecraft-border border-[#7CB342] bg-[#F1F8E9] flex gap-3"
                          >
                            <div className="minecraft-border border-black bg-[#7CB342] text-white font-bold px-3 py-1 h-fit">
                              {idx + 1}
                            </div>
                            <p className="font-normal flex-1">{step}</p>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}

                  {selectedBuild.tips && (
                    <div>
                      <h3 className="font-bold text-lg mb-3 flex items-center gap-2">
                        <Icon name="Lightbulb" size={20} />
                        Советы
                      </h3>
                      <div className="p-4 minecraft-border border-[#FFA726] bg-[#FFF3E0]">
                        <p className="font-normal">{selectedBuild.tips}</p>
                      </div>
                    </div>
                  )}

                  <div className="flex gap-2">
                    <Button 
                      onClick={() => handleSaveToMyProjects(selectedBuild)}
                      className="flex-1 minecraft-border border-black bg-[#7CB342] hover:bg-[#689F38] font-bold"
                    >
                      <Icon name="Save" size={20} className="mr-2" />
                      Сохранить в мои проекты
                    </Button>
                    <Button 
                      onClick={() => handleLike(selectedBuild.id)}
                      variant="outline"
                      className="minecraft-border border-[#EF5350] hover:bg-[#EF5350] hover:text-white font-bold"
                    >
                      <Icon name="Heart" size={20} className="mr-2" />
                      {selectedBuild.likes}
                    </Button>
                  </div>
                </div>
              </ScrollArea>
            </>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default Index;