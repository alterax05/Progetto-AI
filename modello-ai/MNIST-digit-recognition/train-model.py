from torch import nn
from torch.optim import Adam
from torch.utils.data import DataLoader
from torchvision import datasets
from torchvision.transforms import ToTensor, RandomRotation, Compose, RandomErasing, RandomCrop
from torch import cuda
import torch

# Get the device
device = 'cuda' if cuda.is_available() else 'cpu'

# Define your transformations
transform = Compose([
    ToTensor(),
    RandomRotation(10),
    RandomErasing(),
    RandomCrop(28, padding=4),
    # Add more transformations as needed
])

# Get the dataset
dataset = datasets.MNIST('dataset', download=True, train=True, transform=transform)

# Get the dataloader
dataloader = DataLoader(dataset, batch_size=64)

class Model(nn.Module):
    #Constuctor
    def __init__(self):
        super().__init__()
        self.model = nn.Sequential(
            nn.Conv2d(1, 32, (3,3)), # 32 filters, 3x3 kernel
            nn.ReLU(), # Activation function
            nn.Conv2d(32, 64, (3,3)),
            nn.ReLU(),
            nn.Conv2d(64, 64, (3,3)),
            nn.Flatten(), # Flatten the output
            nn.Linear(64*(28-6)*(28-6), 10), # 64 neurons
        )

    def forward(self, x):
        return self.model(x)
    
model = Model().to(device)

# Loss function
loss_fn = nn.CrossEntropyLoss()

# Optimizer
optimizer = Adam(model.parameters(), lr=1e-3)

def evaluate(model):
    dataset = datasets.MNIST('dataset', download=True, train=False, transform=ToTensor())
    dataloader = DataLoader(dataset, batch_size=64)
    correct = 0
    total = len(dataset)
    for data, target in dataloader:
        data = data.to(device)
        target = target.to(device)
        pred = model(data)
        correct += (pred.argmax(1) == target).type(torch.float).sum().item()
    print(f'Accuracy: {(correct/total)*100}%')


def toONNX(model, filename):
    #                        (batch, channel, width and height)
    dummy_input = torch.randn(1, 1, 28, 28).to(device)
    torch.onnx.export(model, dummy_input, filename, verbose=True)

#Trainig loop
if __name__ == '__main__':
    for epoch in range(10): # 10 epochs
        for batch_idx, (data, target) in enumerate(dataloader): 
            data = data.to(device)
            target = target.to(device)

            # Forward
            pred = model(data)
            loss = loss_fn(pred, target)

            # Backward
            optimizer.zero_grad()
            loss.backward()

            # Update
            optimizer.step()

            if batch_idx % 100 == 0:
                print(f'Epoch: {epoch}, Loss: {loss.item()}')

    torch.save(model.state_dict(), 'model.pth')
    print('Done training')

    evaluate(model)

    model.load_state_dict(torch.load('model.pth'))

    toONNX(model, 'model.onnx')