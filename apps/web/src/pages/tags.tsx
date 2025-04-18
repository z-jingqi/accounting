import { Button, Card, CardBody, CardHeader, Input } from '@nextui-org/react';
import { useState } from 'react';
import { useQuery, useMutation } from '@apollo/client';
import { gql } from '@apollo/client';
import Navbar from '../components/Navbar';

const GET_TAGS = gql`
  query GetTags {
    tags {
      id
      name
    }
  }
`;

const CREATE_TAG = gql`
  mutation CreateTag($input: CreateTagInput!) {
    createTag(input: $input) {
      id
      name
    }
  }
`;

const DELETE_TAG = gql`
  mutation DeleteTag($id: ID!) {
    deleteTag(id: $id)
  }
`;

export default function Tags() {
  const [name, setName] = useState('');
  const { data, loading, refetch } = useQuery(GET_TAGS);
  const [createTag] = useMutation(CREATE_TAG);
  const [deleteTag] = useMutation(DELETE_TAG);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await createTag({
        variables: {
          input: {
            name,
          },
        },
      });
      setName('');
      refetch();
    } catch (error) {
      console.error('Error creating tag:', error);
    }
  };

  const handleDelete = async (id: string) => {
    try {
      await deleteTag({
        variables: {
          id,
        },
      });
      refetch();
    } catch (error) {
      console.error('Error deleting tag:', error);
    }
  };

  return (
    <div className="min-h-screen">
      <Navbar />
      <div className="container mx-auto p-4">
        <h1 className="text-3xl font-bold mb-6">标签管理</h1>
        
        <Card className="mb-6">
          <CardHeader>
            <h2 className="text-xl font-semibold">添加新标签</h2>
          </CardHeader>
          <CardBody>
            <form onSubmit={handleSubmit} className="space-y-4">
              <Input
                label="标签名称"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
              />
              <Button type="submit" color="primary">
                添加
              </Button>
            </form>
          </CardBody>
        </Card>
        
        <Card>
          <CardHeader>
            <h2 className="text-xl font-semibold">标签列表</h2>
          </CardHeader>
          <CardBody>
            {loading ? (
              <p>加载中...</p>
            ) : (
              <div className="space-y-4">
                {data?.tags.map((tag: any) => (
                  <Card key={tag.id} className="p-4">
                    <div className="flex justify-between items-center">
                      <p className="font-semibold">{tag.name}</p>
                      <Button
                        color="danger"
                        variant="light"
                        onClick={() => handleDelete(tag.id)}
                      >
                        删除
                      </Button>
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
