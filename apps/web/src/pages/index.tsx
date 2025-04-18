import { Button, Card, CardBody, CardHeader, Input, Select, SelectItem } from '@nextui-org/react';
import { useState } from 'react';
import { useQuery, useMutation } from '@apollo/client';
import { gql } from '@apollo/client';
import { format } from 'date-fns';
import Navbar from '../components/Navbar';

const GET_TRANSACTIONS = gql`
  query GetTransactions {
    transactions {
      id
      amount
      type
      description
      date
      tags {
        id
        name
      }
    }
  }
`;

const CREATE_TRANSACTION = gql`
  mutation CreateTransaction($input: CreateTransactionInput!) {
    createTransaction(input: $input) {
      id
      amount
      type
      description
      date
      tags {
        id
        name
      }
    }
  }
`;

const GET_TAGS = gql`
  query GetTags {
    tags {
      id
      name
    }
  }
`;

export default function Home() {
  const [amount, setAmount] = useState('');
  const [type, setType] = useState('expense');
  const [description, setDescription] = useState('');
  const [selectedTags, setSelectedTags] = useState<string[]>([]);

  const { data: transactionsData, loading: transactionsLoading } = useQuery(GET_TRANSACTIONS);
  const { data: tagsData, loading: tagsLoading } = useQuery(GET_TAGS);
  const [createTransaction] = useMutation(CREATE_TRANSACTION, {
    refetchQueries: [{ query: GET_TRANSACTIONS }],
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await createTransaction({
        variables: {
          input: {
            amount: parseFloat(amount),
            type,
            description,
            date: new Date().toISOString(),
            tagIds: selectedTags,
          },
        },
      });
      setAmount('');
      setDescription('');
      setSelectedTags([]);
    } catch (error) {
      console.error('Error creating transaction:', error);
    }
  };

  return (
    <div className="min-h-screen">
      <Navbar />
      <div className="container mx-auto p-4">
        <h1 className="text-3xl font-bold mb-6">记账应用</h1>
        
        <Card className="mb-6">
          <CardHeader>
            <h2 className="text-xl font-semibold">添加新账单</h2>
          </CardHeader>
          <CardBody>
            <form onSubmit={handleSubmit} className="space-y-4">
              <Input
                type="number"
                label="金额"
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
                required
              />
              
              <Select
                label="类型"
                value={type}
                onChange={(e) => setType(e.target.value)}
              >
                <SelectItem key="income" value="income">收入</SelectItem>
                <SelectItem key="expense" value="expense">支出</SelectItem>
              </Select>
              
              <Input
                label="描述"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
              />
              
              <Select
                label="标签"
                selectionMode="multiple"
                selectedKeys={selectedTags}
                onChange={(e) => setSelectedTags(Array.from(e.target.value))}
              >
                {tagsData?.tags.map((tag: any) => (
                  <SelectItem key={tag.id} value={tag.id}>
                    {tag.name}
                  </SelectItem>
                ))}
              </Select>
              
              <Button type="submit" color="primary">
                添加
              </Button>
            </form>
          </CardBody>
        </Card>
        
        <Card>
          <CardHeader>
            <h2 className="text-xl font-semibold">账单记录</h2>
          </CardHeader>
          <CardBody>
            {transactionsLoading ? (
              <p>加载中...</p>
            ) : (
              <div className="space-y-4">
                {transactionsData?.transactions.map((transaction: any) => (
                  <Card key={transaction.id} className="p-4">
                    <div className="flex justify-between items-center">
                      <div>
                        <p className="font-semibold">
                          {transaction.type === 'income' ? '+' : '-'}
                          {transaction.amount}
                        </p>
                        <p className="text-sm text-gray-500">{transaction.description}</p>
                        <div className="flex gap-2 mt-2">
                          {transaction.tags.map((tag: any) => (
                            <span key={tag.id} className="px-2 py-1 bg-gray-100 rounded-full text-sm">
                              {tag.name}
                            </span>
                          ))}
                        </div>
                      </div>
                      <p className="text-sm text-gray-500">
                        {format(new Date(transaction.date), 'yyyy-MM-dd')}
                      </p>
                    </div>
                  </Card>
                ))}
              </div>
            )}
          </CardBody>
        </Card>
      </div>
    </div>
  );
} 
