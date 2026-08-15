import React, { useState, useEffect } from 'react';
import {
  Car as CarIcon,
  Search,
  CheckCircle2,
  DollarSign,
  Fuel,
  Gauge,
  Sparkles,
  Tag
} from 'lucide-react';
import { dataStore } from '../../lib/supabase';
import { Car, CarBodyType, CarFuel } from '../../types';

export const Cars: React.FC = () => {
  const [cars, setCars] = useState<Car[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [bodyFilter, setBodyFilter] = useState<string>('all');
  const [fuelFilter, setFuelFilter] = useState<string>('all');

  useEffect(() => {
    const load = async () => {
      const data = await dataStore.getCars();
      setCars(data);
    };
    load();
  }, []);

  const filteredCars = cars.filter(c => {
    const matchesBody = bodyFilter === 'all' || c.body_type === bodyFilter;
    const matchesFuel = fuelFilter === 'all' || c.fuel === fuelFilter;
    const matchesSearch = c.brand.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          c.model.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          (c.version && c.version.toLowerCase().includes(searchTerm.toLowerCase()));
    return matchesBody && matchesFuel && matchesSearch;
  });

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
      {/* Header */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '16px' }}>
        <div>
          <h1 style={{ fontSize: '1.8rem', fontWeight: 800, color: 'var(--text-primary)' }}>Estoque de Veículos (cars)</h1>
          <p style={{ fontSize: '0.88rem', color: 'var(--text-secondary)' }}>
            Inventário cadastrado na tabela <code>public.cars</code> utilizado pelo agente de IA para recomendações
          </p>
        </div>

        <span className="badge badge-neutral" style={{ padding: '6px 14px', fontSize: '0.82rem', fontWeight: 600 }}>
          <CarIcon size={14} /> Total: {cars.length} veículos cadastrados
        </span>
      </div>

      {/* Barra de Filtros */}
      <div className="card" style={{ padding: '16px 20px', display: 'flex', flexWrap: 'wrap', gap: '16px', alignItems: 'center', backgroundColor: '#ffffff' }}>
        <div style={{ position: 'relative', flex: 1, minWidth: '220px' }}>
          <input
            type="text"
            value={searchTerm}
            onChange={e => setSearchTerm(e.target.value)}
            placeholder="Buscar por marca, modelo ou versão..."
            className="input-control"
            style={{ paddingLeft: '38px' }}
          />
          <Search size={15} color="var(--text-muted)" style={{ position: 'absolute', left: '12px', top: '50%', transform: 'translateY(-50%)' }} />
        </div>

        {/* Filtro Carroceria */}
        <div style={{ display: 'flex', gap: '6px', alignItems: 'center', flexWrap: 'wrap' }}>
          <span style={{ fontSize: '0.78rem', color: 'var(--text-muted)' }}>Carroceria:</span>
          {['all', 'suv', 'hatch', 'sedã', 'minivan', 'picape'].map(b => (
            <button
              key={b}
              onClick={() => setBodyFilter(b)}
              className={`btn btn-sm ${bodyFilter === b ? 'btn-primary' : 'btn-secondary'}`}
              style={{ fontSize: '0.75rem', padding: '4px 8px' }}
            >
              {b === 'all' ? 'Todas' : b.toUpperCase()}
            </button>
          ))}
        </div>

        {/* Filtro Combustível */}
        <div style={{ display: 'flex', gap: '6px', alignItems: 'center', flexWrap: 'wrap' }}>
          <span style={{ fontSize: '0.78rem', color: 'var(--text-muted)' }}>Combustível:</span>
          {['all', 'flex', 'gasolina', 'híbrido', 'elétrico'].map(f => (
            <button
              key={f}
              onClick={() => setFuelFilter(f)}
              className={`btn btn-sm ${fuelFilter === f ? 'btn-primary' : 'btn-secondary'}`}
              style={{ fontSize: '0.75rem', padding: '4px 8px' }}
            >
              {f === 'all' ? 'Todos' : f}
            </button>
          ))}
        </div>
      </div>

      {/* Grid de Carros */}
      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
        gap: '20px'
      }}>
        {filteredCars.map(car => (
          <div
            key={car.id}
            className="card card-hover"
            style={{
              padding: '22px',
              backgroundColor: '#ffffff',
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'space-between',
              gap: '14px'
            }}
          >
            <div>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '8px' }}>
                <span className="badge badge-neutral" style={{ fontSize: '0.72rem', fontWeight: 700 }}>
                  {car.body_type.toUpperCase()} • {car.year}
                </span>
                <span className={`badge ${car.active ? 'badge-success' : 'badge-neutral'}`} style={{ fontSize: '0.68rem' }}>
                  {car.active ? 'ATIVO' : 'VENDIDO'}
                </span>
              </div>

              <h3 style={{ fontSize: '1.25rem', fontWeight: 800, color: 'var(--text-primary)' }}>
                {car.brand} {car.model}
              </h3>
              <div style={{ fontSize: '0.85rem', color: 'var(--text-secondary)', marginBottom: '8px' }}>
                {car.version || 'Versão padrão'} • {car.color || 'Cor não especificada'}
              </div>

              <div style={{ fontSize: '1.35rem', fontWeight: 800, color: 'var(--text-primary)', marginBottom: '10px' }}>
                R$ {car.price.toLocaleString('pt-BR')}
              </div>

              {/* Especificações */}
              <div style={{
                backgroundColor: 'var(--bg-tertiary)',
                padding: '12px',
                borderRadius: 'var(--radius-md)',
                display: 'grid',
                gridTemplateColumns: '1fr 1fr',
                gap: '8px',
                fontSize: '0.78rem'
              }}>
                <div>
                  <span style={{ color: 'var(--text-muted)' }}>Câmbio:</span> <strong>{car.transmission}</strong>
                </div>
                <div>
                  <span style={{ color: 'var(--text-muted)' }}>Combustível:</span> <strong>{car.fuel}</strong>
                </div>
                <div>
                  <span style={{ color: 'var(--text-muted)' }}>Km:</span> <strong>{car.km ? `${car.km.toLocaleString('pt-BR')} km` : '0 km'}</strong>
                </div>
                <div>
                  <span style={{ color: 'var(--text-muted)' }}>Consumo Urb:</span> <strong>{car.avg_consumption_city ? `${car.avg_consumption_city} km/l` : 'N/A'}</strong>
                </div>
              </div>

              {car.monthly_cost_estimate && (
                <div style={{ fontSize: '0.78rem', color: 'var(--status-success)', marginTop: '8px', fontWeight: 600 }}>
                  Estimativa CTM: R$ {car.monthly_cost_estimate.toLocaleString('pt-BR')}/mês
                </div>
              )}

              {car.notes && (
                <p style={{ fontSize: '0.78rem', color: 'var(--text-muted)', marginTop: '6px', fontStyle: 'italic' }}>
                  "{car.notes}"
                </p>
              )}
            </div>

            <div style={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              paddingTop: '10px',
              borderTop: '1px solid var(--border-subtle)',
              fontSize: '0.75rem',
              color: 'var(--text-muted)'
            }}>
              <span>{car.accepts_trade ? '✓ Aceita Troca' : 'Sem Troca'}</span>
              <span>{car.financing_available ? '✓ Financia' : 'À Vista'}</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
